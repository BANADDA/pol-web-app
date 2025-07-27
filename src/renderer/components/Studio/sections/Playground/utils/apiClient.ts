import type { ApiPayload, StreamCallbacks } from '../types';

// Simulated API functions - replace with actual API calls
export const fetchChatCompletions = async ({
  payload,
  onStreamChunk,
  onStreamEnd,
  onStreamError,
}: {
  payload: ApiPayload;
} & StreamCallbacks) => {
  try {
    console.log('Chat completions payload:', payload);

    // Simulate streaming response
    const response =
      'This is a simulated response from the chat API. In a real implementation, this would connect to your actual AI model endpoint.';
    const chunks = response.split(' ');

    for (let i = 0; i < chunks.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      onStreamChunk?.(i === 0 ? chunks[i] : ' ' + chunks[i]);
    }

    onStreamEnd?.();
  } catch (error) {
    console.error('Chat completions error:', error);
    onStreamError?.(error as Error);
  }
};

export const fetchMultimodalUpload = async ({
  params,
  onStreamChunk,
  onStreamEnd,
  onStreamError,
}: {
  params: ApiPayload;
} & StreamCallbacks) => {
  try {
    console.log('Multimodal upload params:', params);

    // Simulate image processing response
    const response =
      "I can see the image you've uploaded. This is a simulated multimodal response. In a real implementation, this would analyze your image and respond accordingly.";
    const chunks = response.split(' ');

    for (let i = 0; i < chunks.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 60));
      onStreamChunk?.(i === 0 ? chunks[i] : ' ' + chunks[i]);
    }

    onStreamEnd?.();
  } catch (error) {
    console.error('Multimodal upload error:', error);
    onStreamError?.(error as Error);
  }
};

export const fetchChainedChat = async ({
  payload,
  onBreakdownReceived,
  onStreamChunk,
  onStreamEnd,
  onStreamError,
}: {
  payload: ApiPayload & {
    breakdown_model: string;
    response_model: string;
  };
  onBreakdownReceived?: (message: { content: string }) => void;
} & StreamCallbacks) => {
  try {
    console.log('Chained chat payload:', payload);

    // Simulate breakdown step
    await new Promise((resolve) => setTimeout(resolve, 300));
    const breakdownContent = `First, let me analyze this with ${payload.breakdown_model}...`;
    onBreakdownReceived?.({ content: breakdownContent });

    // Simulate main response
    await new Promise((resolve) => setTimeout(resolve, 200));
    const response = `Now, using ${payload.response_model}, here's my detailed response: This is a simulated multi-model response combining the capabilities of both models.`;
    const chunks = response.split(' ');

    for (let i = 0; i < chunks.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      onStreamChunk?.(i === 0 ? chunks[i] : ' ' + chunks[i]);
    }

    onStreamEnd?.();
  } catch (error) {
    console.error('Chained chat error:', error);
    onStreamError?.(error as Error);
  }
};
