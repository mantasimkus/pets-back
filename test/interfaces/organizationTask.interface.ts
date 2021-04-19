export default interface OrganizationTask {
    id: number;
    title: string;
    description: string | null;
    organizationId: number | null;
    isDone: boolean;
}
