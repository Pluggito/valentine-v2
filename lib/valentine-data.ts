export interface ValentineData {
  name: string;
  partnerName: string;
  shipType: "crush" | "relationship" | "situationship" | "brozone";
  messageType: "safe" | "medium" | "unhinged";
  fantasyOrRaw?: "fantasy" | "raw";
}

export type ShipType = ValentineData["shipType"];
export type MessageType = ValentineData["messageType"];
export type FantasyOrRaw = ValentineData["fantasyOrRaw"];
