# Product Requirements Document (PRD) - "Jends App" (MVP)

## 1. Product Vision
A hybrid social platform combining the personal connection of **Threads/Twitter** with the open, topic-based, and anonymous nature of **Reddit**.
**Core Value Proposition:** "Speak your mind freely, or speak as yourself."

## 2. Core Features (MVP)

### A. Authentication & Identity
- **Dual-Persona System**:
  - **Public Profile**: Standard social identity (Name, Handle, Avatar).
  - **Anonymous/Ghost Mode**: Users can interact without linking to their public profile.
- **Auth Provider**: Supabase Auth (Email/Password, Google).

### B. The "Feed" (Home)
- **Unified Feed**: Shows posts from people you follow AND trending topics.
- **Post Types**: Text, Image, Link.
- **Interactions**: Like, Reply, Repost.

### C. The "Forum" (Discussions)
- **Topic-Based**: Instead of subreddits, use "Tags" or "Channels" (e.g., #Tech, #Confessions, #AskJends).
- **Anonymous First**: This tab encourages anonymous participation.
- **Hot/New Sorting**: Classic forum sorting.

### D. The "Composer" (Creation)
- **Toggle Switch**: A prominent switch in the post creator: `[ Public | Anonymous ]`.
- **Context Awareness**: If posting in a specific "Forum" channel, default to Anonymous?

### E. Search & Explore
- Search users and topics.
- Trending hashtags.

## 3. UX/UI Strategy (The "Meta" Polish)

### 1. The "Ghost" Toggle (Key Differentiator)
Don't hide anonymity. Make it a seamless toggle in the composer.
- **Visual Cue**: When "Anonymous" is active, change the UI accent color (e.g., from Blue to Purple or Dark Grey) to signal the mode shift.

### 2. The "Forum" Experience
- **Card Design**:
  - **Public Posts**: Focus on the *User* (Avatar prominent).
  - **Anon Posts**: Focus on the *Content* (Headline/Text prominent).
- **Navigation**:
  - Bottom Tab Bar: `Home`, `Search`, `Forum`, `Activity`, `Profile`.

## 4. Technical Constraints
- **Database**: Supabase (PostgreSQL).
- **Realtime**: Supabase Realtime for notifications and new posts.
- **State**: React Query for data, Zustand for UI state (e.g., Composer mode).

## 5. Future Considerations (Post-MVP)
- Reputation system for anonymous users.
- Private messaging.
- Rich media (Video).
