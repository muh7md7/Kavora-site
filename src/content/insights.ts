// Insights posts — typed local content. Start with 0–3; empty state is handled.
export interface Post { slug: string; title: string; description: string; category: string; date: string; readingMinutes: number; body: string[] }
export const posts: Post[] = [];
