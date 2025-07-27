/**
 * Format bytes to human readable string (GB, MB, etc.)
 * @param bytes - Number of bytes
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted string with units
 */
export const formatBytes = (bytes: number, decimals = 1): string => {
  if (bytes === 0) return '0 GB';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

/**
 * Get color based on usage percentage
 * @param usage - Usage percentage (0-100)
 * @returns Color variant for Material-UI components
 */
export const getUsageColor = (
  usage: number,
): 'success' | 'warning' | 'danger' => {
  if (usage < 30) return 'success';
  if (usage < 70) return 'warning';
  return 'danger';
};

/**
 * Format system uptime to readable string
 * @param uptimeSeconds - Uptime in seconds
 * @returns Formatted uptime string (e.g., "2d 14h 32m")
 */
export const formatUptime = (uptimeSeconds: number): string => {
  const days = Math.floor(uptimeSeconds / 86400);
  const hours = Math.floor((uptimeSeconds % 86400) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  return `${days}d ${hours}h ${minutes}m`;
};

/**
 * Parse integer safely with radix
 * @param value - String value to parse
 * @param radix - Number base (default: 10)
 * @returns Parsed integer or 0 if invalid
 */
export const safeParseInt = (value: string | undefined, radix = 10): number => {
  if (!value) return 0;
  const parsed = parseInt(value, radix);
  return Number.isNaN(parsed) ? 0 : parsed;
};

/**
 * Determine GPU vendor from GPU name
 * @param gpuName - Name of the GPU
 * @returns Vendor name
 */
export const determineGPUVendor = (gpuName: string): string => {
  const name = gpuName.toLowerCase();
  if (name.includes('nvidia')) return 'NVIDIA';
  if (name.includes('amd') || name.includes('radeon')) return 'AMD';
  if (name.includes('intel')) return 'Intel';
  return 'Unknown';
};
