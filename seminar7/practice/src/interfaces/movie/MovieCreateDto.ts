export interface MovieCreateDto {
    title: string;
    director: string;
    startDate?: string;
    thumbnail?: string;
    story?: string;
} //처음 영화만들때는 댓글없으니까~