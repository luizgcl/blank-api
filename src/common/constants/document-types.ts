export enum DocumentType {
  CPF = 'CPF',
  CNPJ = 'CNPJ',
}

export type DocumentTypes = keyof typeof DocumentType;

export const DocumentTypesArray = Object.values(DocumentType) as DocumentType[];

export const DefaultDocumentType = DocumentType.CPF;
