export interface User {
    id: string,
    email: string,
    name: string,
    tempOtp?: number,
    createdAt: Date,
}


export interface Board {
    id: string,
    name: string,
    description?: string,
    userId: string,
    
    createdAt:Date,
    updatedAt: Date,

}

export interface Card {
    id: string,
    name: string,
    description?: string,
    boardId: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface ListMember {
    member_id: string,
    name: string,
}
type status = 'spending' | 'accepted' | 'rejected';
export interface invite{
    inviter_id: string,
    board_owner_id: string,
    member_id: string,
    email_member?: string,
    status:status,
    
}