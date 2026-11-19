export const slugify = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,90);
export const types: Record<string,string> = { PERSON:"Personajes", EVENT:"Acontecimientos", CULTURE:"Cultura", PLACE:"Lugares", HISTORY:"Historia", ARTICLE:"Artículos" };
export const privacyNotice = "Salinasverse documenta la cultura del centro con respeto. No publiques datos privados, rumores, contenido de acoso ni imágenes sin autorización. La información sobre personas puede solicitarse corregir o retirar.";
