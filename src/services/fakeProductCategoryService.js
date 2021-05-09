export const categories = [
    {_id: "1", name: "Electronic"},
    {_id: "2", name: "Sport"},
    {_id: "3", name: "Furniture"},
    {_id: "4", name: "Hygine"},
    {_id: "5", name: "Misc"}
];

export function getCategories() {
    return categories.filter(x => x);
}