export interface PollsPage {
    content: Poll[];
    totalElements: number;
    numberOfElements: number;
    size: number;
}

export interface Poll {
    name: string;
    createDate: Date;
    expireDate: Date;
    tags: string[];
    multiOptions: boolean;
    totalVotes: number;
    state: string;
    options: Option[];
    id: string;
    private: boolean;
}

export interface Option {
    name: string;
    votesCount: number;
}