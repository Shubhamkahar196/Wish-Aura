export function generateSlug(title:string){
    const slug = title.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g,"")
    .replace(/\s+/g,"-")

    const unique = Math.random().toString().substring(2,8);

    return `${slug}-${unique}`;
}