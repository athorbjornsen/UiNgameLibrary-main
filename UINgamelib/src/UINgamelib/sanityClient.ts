import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '6hz8ie6d', 
  dataset:  'production', 
  apiVersion: '2023-09-27', 
  useCdn: true, 
  token: 'skYqsPViozZVBk3XeXgbkjgusLqmIS3Pr8Cju5L7Ql4Ix3GDrgVDnDgRojJ6FN3rVlAoINMmWVnihaMweEtdZYzufy2KYGOJiVnOC0EbnZtxZJh4aOVTYwhquYS6u6IyTXXdJJP9Kx4YDeJC3x3LSa7ge7fmem74703mcrj9vjtCIZvZu6vp', 
  ignoreBrowserTokenWarning: true,
});

export default sanityClient;
