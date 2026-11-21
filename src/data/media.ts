// Static media catalogue for video + podcast. Articles and stories come from the API.
// When a channel/episode URL is known, set it here — cards and CTAs become links automatically.

export interface VideoItem {
  id: string;
  title: string;
  /** mm:ss or h:mm:ss */
  duration: string;
  views: string;
  thumbnail: string;
  href?: string;
}

export interface PodcastEpisode {
  id: string;
  number: number;
  title: string;
  guest: string;
  guestRole: string;
  durationMinutes: number;
  href?: string;
}

export const MEDIA_LINKS: { videoChannel?: string; podcast?: string } = {
  videoChannel: undefined,
  podcast: undefined,
};

export const PODCAST_SHOW_NAME = "The Afrisinc Podcast";

export const VIDEOS: VideoItem[] = [
  {
    id: "cloud-platform-demo",
    title: "Afrisinc Cloud Platform Demo",
    duration: "12:45",
    views: "15K views",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  },
  {
    id: "enterprise-software-africa",
    title: "Building Enterprise Software in Africa",
    duration: "24:30",
    views: "32K views",
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80",
  },
  {
    id: "tech-leadership-panel",
    title: "Tech Leadership Panel Discussion",
    duration: "45:00",
    views: "28K views",
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
  },
  {
    id: "engineering-culture",
    title: "Inside Afrisinc's Engineering Culture",
    duration: "18:20",
    views: "9.4K views",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
  },
  {
    id: "founder-playbook",
    title: "From Idea to Product: A Founder's Playbook",
    duration: "31:10",
    views: "21K views",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
  {
    id: "securing-fintech",
    title: "Securing African Fintech at Scale",
    duration: "27:55",
    views: "17K views",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
  },
];

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: "ep-42",
    number: 42,
    title: "Scaling Tech Teams Remotely",
    guest: "Sarah Mensah",
    guestRole: "CTO",
    durationMinutes: 58,
  },
  {
    id: "ep-41",
    number: 41,
    title: "Future of Cloud Computing",
    guest: "James Okonkwo",
    guestRole: "Head of Cloud",
    durationMinutes: 45,
  },
  {
    id: "ep-40",
    number: 40,
    title: "Startup to Enterprise Journey",
    guest: "Amina Diallo",
    guestRole: "CEO",
    durationMinutes: 52,
  },
  {
    id: "ep-39",
    number: 39,
    title: "Designing for Low-Bandwidth Markets",
    guest: "Kwame Boateng",
    guestRole: "Head of Design",
    durationMinutes: 39,
  },
  {
    id: "ep-38",
    number: 38,
    title: "Raising a Series A in Africa",
    guest: "Ngozi Adeyemi",
    guestRole: "Founder",
    durationMinutes: 61,
  },
  {
    id: "ep-37",
    number: 37,
    title: "The Open RAN Opportunity",
    guest: "David Mwangi",
    guestRole: "Network Architect",
    durationMinutes: 44,
  },
];
