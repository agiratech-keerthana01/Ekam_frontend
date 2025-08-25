export interface PlanAdmin {
    id: number;
  name: string;
  price: number;
  isActive: boolean;
  maxHires: number;
  jobSlots: number;
  searchResults: number;
  cvViews: number;
  createdAt: string;
  updatedAt: string;
}