export class Poll {
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

    public toString = (): string => {

        return `Poll (id: ${this.id}, name: ${this.name}, createDate: ${this.createDate},
         expireDate: ${this.expireDate}, tags: ${this.tags}, multiOptions: ${this.multiOptions},
         totalVotes: ${this.totalVotes}, state: ${this.state}, private: ${this.private},
         options: ${this.options})`;
    }
}

export class Option {
    name: string;
    votesCount: number;

    public toString = (): string => {

        return `Poll (name: ${this.name}, votes: ${this.votesCount})`;
    }
}