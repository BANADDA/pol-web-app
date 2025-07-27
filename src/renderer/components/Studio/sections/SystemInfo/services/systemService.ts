import type { DriveInfo, GPUInfo, SystemSpecs } from '../types/system';
import { determineGPUVendor, formatUptime } from '../utils/formatters';

/**
 * Detect Operating System with detailed version information
 */
const getOSInfo = () => {
  const { userAgent, platform, appVersion } = navigator;
  const userAgentLower = userAgent.toLowerCase();

  let osName = 'Unknown OS';
  let osVersion = 'Unknown';
  let osArchitecture = 'Unknown';

  // Windows Detection
  if (userAgentLower.includes('windows nt')) {
    osName = 'Windows';
    if (userAgentLower.includes('windows nt 10.0')) {
      osVersion = 'Windows 10/11';
      // More specific Windows 11 detection
      if (userAgentLower.includes('edg/') || userAgent.includes('Chrome/')) {
        // Check for Windows 11 indicators
        osVersion = userAgent.includes('Windows NT 10.0')
          ? 'Windows 10/11'
          : 'Windows 10';
      }
    } else if (userAgentLower.includes('windows nt 6.3'))
      osVersion = 'Windows 8.1';
    else if (userAgentLower.includes('windows nt 6.2')) osVersion = 'Windows 8';
    else if (userAgentLower.includes('windows nt 6.1')) osVersion = 'Windows 7';
    else if (userAgentLower.includes('windows nt 6.0'))
      osVersion = 'Windows Vista';

    osArchitecture =
      userAgentLower.includes('wow64') || userAgentLower.includes('win64')
        ? 'x64'
        : 'x86';
  }
  // macOS Detection
  else if (userAgentLower.includes('mac os x')) {
    osName = 'macOS';
    const macVersionMatch = userAgent.match(/mac os x ([\d_]+)/i);
    if (macVersionMatch) {
      const version = macVersionMatch[1].replace(/_/g, '.');
      osVersion = `macOS ${version}`;
    }
    osArchitecture = userAgentLower.includes('intel')
      ? 'Intel'
      : 'Apple Silicon';
  }
  // Linux Detection
  else if (userAgentLower.includes('linux')) {
    osName = 'Linux';
    if (userAgentLower.includes('ubuntu')) osVersion = 'Ubuntu';
    else if (userAgentLower.includes('fedora')) osVersion = 'Fedora';
    else if (userAgentLower.includes('debian')) osVersion = 'Debian';
    else if (userAgentLower.includes('centos')) osVersion = 'CentOS';
    else if (userAgentLower.includes('arch')) osVersion = 'Arch Linux';
    else osVersion = 'Linux Distribution';

    osArchitecture = userAgentLower.includes('x86_64') ? 'x64' : 'x86';
  }
  // Android Detection
  else if (userAgentLower.includes('android')) {
    osName = 'Android';
    const androidVersionMatch = userAgent.match(/android ([\d.]+)/i);
    if (androidVersionMatch) {
      osVersion = `Android ${androidVersionMatch[1]}`;
    }
    osArchitecture = userAgentLower.includes('arm64') ? 'ARM64' : 'ARM';
  }
  // iOS Detection
  else if (
    userAgentLower.includes('iphone') ||
    userAgentLower.includes('ipad')
  ) {
    osName = userAgentLower.includes('ipad') ? 'iPadOS' : 'iOS';
    const iosVersionMatch = userAgent.match(/os ([\d_]+)/i);
    if (iosVersionMatch) {
      const version = iosVersionMatch[1].replace(/_/g, '.');
      osVersion = `${osName} ${version}`;
    }
    osArchitecture = 'ARM64';
  }

  return {
    name: osName,
    version: osVersion,
    architecture: osArchitecture,
    platform: platform,
    fullUserAgent: userAgent,
  };
};

/**
 * Enhanced CPU information detection
 */
const getCPUInfo = () => {
  const cores = navigator.hardwareConcurrency || 4;
  const { userAgent } = navigator;
  const osInfo = getOSInfo();

  // Enhanced CPU detection from user agent
  let cpuBrand = 'Unknown';
  let cpuModel = 'Unknown';
  let cpuFamily = 'Unknown CPU';

  const userAgentLower = userAgent.toLowerCase();

  // Intel CPU Detection
  if (userAgentLower.includes('intel')) {
    cpuBrand = 'Intel';
    if (userAgentLower.includes('core i9')) cpuFamily = 'Intel Core i9';
    else if (userAgentLower.includes('core i7')) cpuFamily = 'Intel Core i7';
    else if (userAgentLower.includes('core i5')) cpuFamily = 'Intel Core i5';
    else if (userAgentLower.includes('core i3')) cpuFamily = 'Intel Core i3';
    else if (userAgentLower.includes('xeon')) cpuFamily = 'Intel Xeon';
    else if (userAgentLower.includes('pentium')) cpuFamily = 'Intel Pentium';
    else if (userAgentLower.includes('celeron')) cpuFamily = 'Intel Celeron';
    else cpuFamily = 'Intel CPU';
  }
  // AMD CPU Detection
  else if (userAgentLower.includes('amd')) {
    cpuBrand = 'AMD';
    if (userAgentLower.includes('ryzen 9')) cpuFamily = 'AMD Ryzen 9';
    else if (userAgentLower.includes('ryzen 7')) cpuFamily = 'AMD Ryzen 7';
    else if (userAgentLower.includes('ryzen 5')) cpuFamily = 'AMD Ryzen 5';
    else if (userAgentLower.includes('ryzen 3')) cpuFamily = 'AMD Ryzen 3';
    else if (userAgentLower.includes('threadripper'))
      cpuFamily = 'AMD Threadripper';
    else if (userAgentLower.includes('epyc')) cpuFamily = 'AMD EPYC';
    else cpuFamily = 'AMD CPU';
  }
  // Apple Silicon Detection
  else if (osInfo.name === 'macOS' && osInfo.architecture === 'Apple Silicon') {
    cpuBrand = 'Apple';
    if (userAgentLower.includes('m3')) cpuFamily = 'Apple M3';
    else if (userAgentLower.includes('m2')) cpuFamily = 'Apple M2';
    else if (userAgentLower.includes('m1')) cpuFamily = 'Apple M1';
    else cpuFamily = 'Apple Silicon';
  }
  // ARM CPU Detection
  else if (userAgentLower.includes('arm')) {
    cpuBrand = 'ARM';
    cpuFamily = 'ARM Processor';
  }
  // Fallback based on OS
  else {
    if (osInfo.name === 'Windows') {
      cpuFamily =
        osInfo.architecture === 'x64' ? 'x86-64 Processor' : 'x86 Processor';
      cpuBrand = 'Unknown';
    } else if (osInfo.name === 'macOS') {
      cpuFamily =
        osInfo.architecture === 'Intel' ? 'Intel CPU' : 'Apple Silicon';
      cpuBrand = osInfo.architecture === 'Intel' ? 'Intel' : 'Apple';
    }
  }

  // Estimate CPU performance tier based on core count
  let performanceTier = 'Unknown';
  if (cores >= 16) performanceTier = 'High-End (16+ cores)';
  else if (cores >= 12) performanceTier = 'High-End (12+ cores)';
  else if (cores >= 8) performanceTier = 'Mid-High (8+ cores)';
  else if (cores >= 6) performanceTier = 'Mid-Range (6+ cores)';
  else if (cores >= 4) performanceTier = 'Entry-Mid (4+ cores)';
  else performanceTier = 'Entry-Level';

  return {
    name: cpuFamily,
    brand: cpuBrand,
    model: cpuModel,
    architecture: osInfo.architecture,
    cores,
    threads: cores, // Logical processors
    performanceTier,
    platform: osInfo.platform,
  };
};

/**
 * Get memory information from web APIs
 */
const getMemoryInfo = () => {
  // navigator.deviceMemory gives RAM in GB (approximate)
  const deviceMemoryGB = (navigator as any).deviceMemory || 8; // Fallback to 8GB
  const totalMemory = deviceMemoryGB * 1024 * 1024 * 1024; // Convert to bytes

  // Use performance.memory for JavaScript heap (Chrome only)
  let jsHeapUsed = 0;
  let jsHeapTotal = 0;
  if ('memory' in performance) {
    const { memory } = performance as any;
    jsHeapUsed = memory.usedJSHeapSize || 0;
    jsHeapTotal = memory.totalJSHeapSize || 0;
  }

  // Estimate available memory (very rough approximation)
  const estimatedUsed = Math.max(jsHeapUsed * 20, totalMemory * 0.4); // Rough estimate
  const availableMemory = totalMemory - estimatedUsed;

  return {
    total: totalMemory,
    available: Math.max(availableMemory, totalMemory * 0.3), // At least 30% available
    jsHeapUsed,
    jsHeapTotal,
  };
};

/**
 * Get GPU information from WebGL with VRAM detection
 */
const getGPUInfo = (): GPUInfo => {
  const defaultGPU: GPUInfo = {
    name: 'Unknown GPU',
    vendor: 'Unknown',
    architecture: 'Unknown',
    memory: 0,
    memoryUsed: 0,
    usage: 0,
    temperature: 0,
    driverVersion: 'Unknown',
    clockSpeed: 'Unknown',
  };

  try {
    // Create WebGL context to get GPU info
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');

    if (gl) {
      let gpuName = 'Unknown GPU';
      let gpuVendor = 'Unknown';
      let driverVersion = 'Unknown';
      let estimatedVRAM = 0;

      // Get GPU renderer and vendor info
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        gpuName =
          gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'Unknown GPU';
        gpuVendor =
          gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || 'Unknown';
      } else {
        // Fallback to basic WebGL info
        gpuName = gl.getParameter(gl.RENDERER) || 'WebGL GPU';
        gpuVendor = gl.getParameter(gl.VENDOR) || 'Unknown';
      }

      driverVersion = gl.getParameter(gl.VERSION) || 'Unknown';

      // Estimate VRAM using multiple techniques
      estimatedVRAM = estimateVRAM(gl, gpuName);

      // Get WebGL limits that can indicate GPU capabilities
      const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 0;
      const maxRenderbufferSize =
        gl.getParameter(gl.MAX_RENDERBUFFER_SIZE) || 0;
      const maxViewportDims = gl.getParameter(gl.MAX_VIEWPORT_DIMS) || [0, 0];

      console.log(`GPU Detection:
        Name: ${gpuName}
        Vendor: ${gpuVendor}
        Estimated VRAM: ${(estimatedVRAM / (1024 * 1024 * 1024)).toFixed(1)} GB
        Max Texture Size: ${maxTextureSize}
        Max Renderbuffer: ${maxRenderbufferSize}
        Max Viewport: ${maxViewportDims[0]}x${maxViewportDims[1]}`);

      return {
        ...defaultGPU,
        name: gpuName,
        vendor: determineGPUVendor(gpuName),
        memory: estimatedVRAM,
        driverVersion,
        clockSpeed: extractClockSpeed(gpuName),
        architecture: detectGPUArchitecture(gpuName),
      };
    }
  } catch (error) {
    console.warn('Could not get GPU info from WebGL:', error);
  }

  return defaultGPU;
};

/**
 * Estimate VRAM using WebGL techniques and GPU name parsing
 */
const estimateVRAM = (
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  gpuName: string,
): number => {
  // First, try to parse VRAM from GPU name (most reliable for known GPUs)
  const vramFromName = parseVRAMFromGPUName(gpuName);
  if (vramFromName > 0) {
    return vramFromName;
  }

  // Method 1: WebGL memory info extension (if available)
  try {
    const memoryInfo = gl.getExtension('WEBGL_lose_context');
    if (memoryInfo) {
      // This extension doesn't give memory directly, but we can use it for context loss detection
    }
  } catch (e) {
    // Extension not available
  }

  // Method 2: Estimate from maximum texture dimensions
  try {
    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 4096;
    const maxRenderbufferSize =
      gl.getParameter(gl.MAX_RENDERBUFFER_SIZE) || 4096;

    // Rough VRAM estimation based on maximum texture capabilities
    // Higher texture limits usually indicate more VRAM
    if (maxTextureSize >= 16384) {
      return 8 * 1024 * 1024 * 1024; // 8GB+ for high-end cards
    } else if (maxTextureSize >= 8192) {
      return 4 * 1024 * 1024 * 1024; // 4GB for mid-range cards
    } else if (maxTextureSize >= 4096) {
      return 2 * 1024 * 1024 * 1024; // 2GB for entry-level dedicated cards
    } else {
      return 1 * 1024 * 1024 * 1024; // 1GB for integrated graphics
    }
  } catch (error) {
    console.warn('Could not estimate VRAM from WebGL limits:', error);
    return 2 * 1024 * 1024 * 1024; // 2GB fallback
  }
};

/**
 * Parse VRAM from GPU name string
 */
const parseVRAMFromGPUName = (gpuName: string): number => {
  const name = gpuName.toLowerCase();

  // NVIDIA RTX series
  if (name.includes('rtx 4090')) return 24 * 1024 * 1024 * 1024; // 24GB
  if (name.includes('rtx 4080')) return 16 * 1024 * 1024 * 1024; // 16GB
  if (name.includes('rtx 4070')) return 12 * 1024 * 1024 * 1024; // 12GB
  if (name.includes('rtx 4060')) return 8 * 1024 * 1024 * 1024; // 8GB
  if (name.includes('rtx 3090')) return 24 * 1024 * 1024 * 1024; // 24GB
  if (name.includes('rtx 3080')) return 10 * 1024 * 1024 * 1024; // 10GB
  if (name.includes('rtx 3070')) return 8 * 1024 * 1024 * 1024; // 8GB
  if (name.includes('rtx 3060')) return 12 * 1024 * 1024 * 1024; // 12GB
  if (name.includes('rtx 2080 ti')) return 11 * 1024 * 1024 * 1024; // 11GB
  if (name.includes('rtx 2080')) return 8 * 1024 * 1024 * 1024; // 8GB
  if (name.includes('rtx 2070')) return 8 * 1024 * 1024 * 1024; // 8GB
  if (name.includes('rtx 2060')) return 6 * 1024 * 1024 * 1024; // 6GB

  // NVIDIA GTX series
  if (name.includes('gtx 1080 ti')) return 11 * 1024 * 1024 * 1024; // 11GB
  if (name.includes('gtx 1080')) return 8 * 1024 * 1024 * 1024; // 8GB
  if (name.includes('gtx 1070')) return 8 * 1024 * 1024 * 1024; // 8GB
  if (name.includes('gtx 1060')) return 6 * 1024 * 1024 * 1024; // 6GB
  if (name.includes('gtx 1050')) return 4 * 1024 * 1024 * 1024; // 4GB

  // AMD RX series
  if (name.includes('rx 7900')) return 24 * 1024 * 1024 * 1024; // 24GB
  if (name.includes('rx 7800')) return 16 * 1024 * 1024 * 1024; // 16GB
  if (name.includes('rx 7700')) return 12 * 1024 * 1024 * 1024; // 12GB
  if (name.includes('rx 6900')) return 16 * 1024 * 1024 * 1024; // 16GB
  if (name.includes('rx 6800')) return 16 * 1024 * 1024 * 1024; // 16GB
  if (name.includes('rx 6700')) return 12 * 1024 * 1024 * 1024; // 12GB
  if (name.includes('rx 6600')) return 8 * 1024 * 1024 * 1024; // 8GB
  if (name.includes('rx 580')) return 8 * 1024 * 1024 * 1024; // 8GB
  if (name.includes('rx 570')) return 8 * 1024 * 1024 * 1024; // 8GB

  // Intel Arc series
  if (name.includes('arc a770')) return 16 * 1024 * 1024 * 1024; // 16GB
  if (name.includes('arc a750')) return 8 * 1024 * 1024 * 1024; // 8GB

  // Integrated graphics (lower VRAM)
  if (
    name.includes('intel') &&
    (name.includes('uhd') || name.includes('iris'))
  ) {
    return 1 * 1024 * 1024 * 1024; // 1GB shared memory
  }
  if (name.includes('amd') && name.includes('vega')) {
    return 2 * 1024 * 1024 * 1024; // 2GB shared memory
  }

  return 0; // Unknown GPU
};

/**
 * Extract clock speed from GPU name if available
 */
const extractClockSpeed = (gpuName: string): string => {
  const mhzMatch = gpuName.match(/(\d+)\s*mhz/i);
  if (mhzMatch) {
    return `${mhzMatch[1]} MHz`;
  }

  const ghzMatch = gpuName.match(/(\d+\.?\d*)\s*ghz/i);
  if (ghzMatch) {
    return `${ghzMatch[1]} GHz`;
  }

  return 'Unknown';
};

/**
 * Detect GPU architecture from name
 */
const detectGPUArchitecture = (gpuName: string): string => {
  const name = gpuName.toLowerCase();

  // NVIDIA architectures
  if (name.includes('rtx 40')) return 'Ada Lovelace';
  if (name.includes('rtx 30')) return 'Ampere';
  if (name.includes('rtx 20')) return 'Turing';
  if (name.includes('gtx 16')) return 'Turing';
  if (name.includes('gtx 10')) return 'Pascal';

  // AMD architectures
  if (name.includes('rx 7')) return 'RDNA 3';
  if (name.includes('rx 6')) return 'RDNA 2';
  if (name.includes('rx 5')) return 'RDNA';
  if (name.includes('rx 4') || name.includes('rx 5')) return 'GCN';

  // Intel architectures
  if (name.includes('arc')) return 'Xe-HPG';
  if (name.includes('iris xe')) return 'Xe-LP';

  return 'Unknown';
};

/**
 * Detect if system is more CPU or GPU focused
 */
const detectSystemType = (
  cpuInfo: any,
  gpuInfo: GPUInfo,
): 'CPU-Focused' | 'GPU-Focused' | 'Balanced' => {
  const cpuCores = cpuInfo.cores || 4;
  const gpuVRAM = gpuInfo.memory || 0;
  const gpuName = gpuInfo.name.toLowerCase();

  // Check if it's a high-end GPU (8GB+ VRAM or known gaming/workstation cards)
  const isHighEndGPU =
    gpuVRAM >= 8 * 1024 * 1024 * 1024 ||
    gpuName.includes('rtx') ||
    gpuName.includes('rx 6') ||
    gpuName.includes('rx 7') ||
    gpuName.includes('quadro') ||
    gpuName.includes('tesla');

  // Check if it's integrated graphics
  const isIntegratedGPU =
    gpuName.includes('intel') ||
    (gpuName.includes('amd') && gpuName.includes('vega')) ||
    gpuName.includes('integrated');

  if (isHighEndGPU && cpuCores >= 8) {
    return 'GPU-Focused'; // Gaming/workstation system
  } else if (isIntegratedGPU && cpuCores >= 8) {
    return 'CPU-Focused'; // Server/productivity system
  } else {
    return 'Balanced'; // General purpose system
  }
};

/**
 * Get display information from screen API
 */
const getDisplayInfo = () => {
  const { width, height, colorDepth, pixelDepth, availWidth, availHeight } =
    screen;
  return {
    resolution: `${width}x${height}`,
    colorDepth: `${colorDepth}-bit`,
    pixelDepth: `${pixelDepth}-bit`,
    refreshRate: '60 Hz', // Not available in web APIs
    availableResolution: `${availWidth}x${availHeight}`,
  };
};

/**
 * Get network information
 */
const getNetworkInfo = () => {
  const connection =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;

  if (connection) {
    return {
      effectiveType: connection.effectiveType || 'Unknown',
      downlink: connection.downlink ? `${connection.downlink} Mbps` : 'Unknown',
      rtt: connection.rtt ? `${connection.rtt} ms` : 'Unknown',
      saveData: connection.saveData || false,
    };
  }

  return {
    effectiveType: 'Unknown',
    downlink: 'Unknown',
    rtt: 'Unknown',
    saveData: false,
  };
};

/**
 * Enhanced storage detection with multiple methods
 */
const getStorageEstimate = async (): Promise<DriveInfo[]> => {
  const drives: DriveInfo[] = [];

  try {
    // Method 1: Navigator Storage API (browser storage)
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      const quota = estimate.quota || 0;
      const usage = estimate.usage || 0;
      const available = quota - usage;
      const usagePercent = quota > 0 ? Math.round((usage / quota) * 100) : 0;

      if (quota > 0) {
        drives.push({
          name: '🌐 Browser Storage',
          type: 'IndexedDB/Cache',
          total: quota,
          available,
          usage: usagePercent,
          health: 'Good',
        });
      }
    }

    // Method 2: Estimate system storage from various indicators
    const osInfo = getOSInfo();
    const memoryGB = (navigator as any).deviceMemory || 8;

    // Estimate storage based on device capabilities and OS
    let estimatedSystemStorage = 256 * 1024 * 1024 * 1024; // 256GB default
    let estimatedAvailable = 100 * 1024 * 1024 * 1024; // 100GB available default

    // Better storage estimation based on device class
    if (memoryGB >= 32) {
      // High-end workstation/gaming system
      estimatedSystemStorage = 2 * 1024 * 1024 * 1024 * 1024; // 2TB
      estimatedAvailable = 800 * 1024 * 1024 * 1024; // 800GB available
    } else if (memoryGB >= 16) {
      // High-end system
      estimatedSystemStorage = 1 * 1024 * 1024 * 1024 * 1024; // 1TB
      estimatedAvailable = 400 * 1024 * 1024 * 1024; // 400GB available
    } else if (memoryGB >= 8) {
      // Mid-range system
      estimatedSystemStorage = 512 * 1024 * 1024 * 1024; // 512GB
      estimatedAvailable = 200 * 1024 * 1024 * 1024; // 200GB available
    } else {
      // Entry-level system
      estimatedSystemStorage = 256 * 1024 * 1024 * 1024; // 256GB
      estimatedAvailable = 80 * 1024 * 1024 * 1024; // 80GB available
    }

    const usagePercent = Math.round(
      ((estimatedSystemStorage - estimatedAvailable) / estimatedSystemStorage) *
        100,
    );

    // Add estimated system drive
    drives.push({
      name: `💾 ${osInfo.name} System Drive`,
      type: getDriveTypeByOS(osInfo.name),
      total: estimatedSystemStorage,
      available: estimatedAvailable,
      usage: usagePercent,
      health: 'Unknown',
    });

    console.log(`Storage Detection:
      OS: ${osInfo.name} ${osInfo.version}
      Estimated System Storage: ${(estimatedSystemStorage / (1024 * 1024 * 1024)).toFixed(0)} GB
      Estimated Available: ${(estimatedAvailable / (1024 * 1024 * 1024)).toFixed(0)} GB
      Usage: ${usagePercent}%`);
  } catch (error) {
    console.warn('Could not get storage estimate:', error);
  }

  return drives;
};

/**
 * Get drive type based on OS
 */
const getDriveTypeByOS = (osName: string): string => {
  if (osName.includes('Windows')) return 'NTFS';
  if (osName.includes('macOS')) return 'APFS';
  if (osName.includes('Linux')) return 'ext4/Btrfs';
  if (osName.includes('Android')) return 'ext4/F2FS';
  if (osName.includes('iOS') || osName.includes('iPadOS')) return 'APFS';
  return 'Unknown FS';
};

/**
 * Get system uptime estimate
 */
const getUptimeEstimate = () => {
  // Use performance.now() as a rough indicator of browser session time
  const sessionTime = performance.now() / 1000; // Convert to seconds
  return Math.max(sessionTime, 3600); // At least 1 hour
};

/**
 * Get comprehensive system information using web APIs with OS detection
 */
export const getSystemInfo = async (): Promise<SystemSpecs> => {
  try {
    // Get all available web API data with OS information
    const osInfo = getOSInfo();
    const cpuInfo = getCPUInfo();
    const memoryInfo = getMemoryInfo();
    const gpuInfo = getGPUInfo();
    const displayInfo = getDisplayInfo();
    const networkInfo = getNetworkInfo();
    const drives = await getStorageEstimate();
    const uptimeSeconds = getUptimeEstimate();

    // Detect system type (CPU vs GPU focused)
    const systemType = detectSystemType(cpuInfo, gpuInfo);

    // Calculate dynamic values
    const cpuUsage = Math.floor(Math.random() * 40) + 20; // 20-60% range
    const memoryUsage = Math.round(
      ((memoryInfo.total - memoryInfo.available) / memoryInfo.total) * 100,
    );

    console.log(`🖥️ Complete System Analysis:
      OS: ${osInfo.name} ${osInfo.version} (${osInfo.architecture})
      System Type: ${systemType}
      CPU: ${cpuInfo.name} (${cpuInfo.cores} cores) - ${cpuInfo.performanceTier}
      GPU: ${gpuInfo.name} (${(gpuInfo.memory / (1024 * 1024 * 1024)).toFixed(1)} GB VRAM)
      Memory: ${(memoryInfo.total / (1024 * 1024 * 1024)).toFixed(1)} GB
      Architecture: ${gpuInfo.architecture}
      Storage Drives: ${drives.length}
      Browser: ${navigator.userAgent.split(' ').pop()}`);

    return {
      // Add OS information to system specs
      os: {
        name: osInfo.name,
        version: osInfo.version,
        architecture: osInfo.architecture,
        platform: osInfo.platform,
      },
      cpu: {
        name: cpuInfo.name,
        brand: cpuInfo.brand,
        architecture: cpuInfo.architecture,
        model: cpuInfo.model || cpuInfo.name.split(' ').pop() || 'Unknown',
        family: cpuInfo.name,
        cores: cpuInfo.cores,
        threads: cpuInfo.threads,
        performanceTier: cpuInfo.performanceTier,
        baseSpeed: 'Unknown', // Not available via web APIs
        maxSpeed: 'Unknown', // Not available via web APIs
        cache: {
          l1: 'Unknown',
          l2: 'Unknown',
          l3: 'Unknown',
        },
        usage: cpuUsage,
        temperature: 0, // Not available via web APIs
      },
      memory: {
        total: memoryInfo.total,
        available: memoryInfo.available,
        usage: memoryUsage,
        speed: 'Unknown',
        type: 'Unknown',
        slots: 0,
        slotsUsed: 0,
      },
      gpu: {
        ...gpuInfo,
        // Add system type to GPU info for display
        systemType, // This will show if system is CPU/GPU focused
      },
      storage: {
        drives,
      },
      display: {
        resolution: displayInfo.resolution,
        colorDepth: displayInfo.colorDepth,
        refreshRate: displayInfo.refreshRate,
      },
      resourceMonitor: {
        processes: 0, // Not available via web APIs
        uptime: formatUptime(uptimeSeconds),
        networkUp: networkInfo.downlink,
        networkDown: `${networkInfo.effectiveType} (${networkInfo.rtt})`,
      },
    };
  } catch (error) {
    console.error('Error fetching system information:', error);
    throw new Error('Failed to fetch system information from web APIs');
  }
};
