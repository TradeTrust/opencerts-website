export interface TemplateProps {
  id: string;
  label: string;
  type: string;
}

export interface TitleEscrowEvent {
  titleEscrowAddress: string;
  beneficiary: string;
  holderChangeEvents: {
    blockNumber: number;
    holder: string;
    timestamp: number;
  }[];
}

export interface ResourcesLinkProps {
  title: string;
  type: "link" | "download";
  details: {
    description: string;
    url: string;
    icon?: string;
  };
}
