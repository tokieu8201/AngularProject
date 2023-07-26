export class Item {
    id: number = 0;
    title: string = "";
    shortDescription: string = "";
    description: string = ""; 
    image: string = ""; 
    postedOn: Date = new Date();
    favoritesCount: number = 0;
    isLiked: boolean = false;
}