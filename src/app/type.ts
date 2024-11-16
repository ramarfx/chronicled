interface Author {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  bot: boolean;
  banner: string | null;
  accent_color: string | null;
  global_name: string | null;
  avatar_decoration_data: string | null;
  banner_color: string | null;
  clan: string | null;
}

interface Attachment {
  id: string;
  filename: string;
  size: number;
  url: string;
  proxy_url: string;
  width: number;
  height: number;
  content_type: string;
  content_scan_version: number;
  placeholder: string;
  placeholder_version: number;
}

export interface Message {
  type: number;
  content: string;
  mentions: any[];
  mention_roles: any[];
  attachments: Attachment[];
  embeds: any[];
  timestamp: string;
  edited_timestamp: string | null;
  flags: number;
  components: any[];
  id: string;
  channel_id: string;
  author: Author;
  pinned: boolean;
  mention_everyone: boolean;
  tts: boolean;
}
