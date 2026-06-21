const {addDoc,collection,getDocs,getDoc, updateDoc,doc,deleteDoc,query,where} = require('firebase/firestore');
const {db} = require('../configs/firebase-config.js');

const boardController = {

    createNewBoard: async (req, res) => {
        const { name, description } = req.body;
        const userId = req.user.id; 
        
        try{
            const boardObject = { name, description,owner_id: userId };
            const board = await addDoc((collection(db, 'boards')), boardObject);
            
            res.status(200).json(boardObject);
        }
        catch(error){
            res.status(500).json({ message: "lỗi " });
        }

    },

    getAllBoards: async (req, res) => {
        try{
            const ref = await getDocs(query(collection(db, 'boards'), where('owner_id', '==', req.user.id)));
            const getAllBoards = ref.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            res.status(200).json(getAllBoards);
        }
        catch(error){
            res.status(500).json({ message: "lỗi " });
        }
    },
    getBoardById: async (req, res) => {
        try{
            const { id } = req.params;
            const ref = await getDoc(doc(db, 'boards',id));
            if(!ref){
                res.status(404).json({ message: "Không tìm thấy board" });
            }
            const getBoardById = { id: ref.id, ...ref.data() };

            res.status(200).json(getBoardById);
        }
        catch(error){
            res.status(500).json({ message: error.message });  
        }
    },
    updateBoardById: async (req, res) => {
        try{
            const { id } = req.params;
            const { name, description } = req.body;
            const ref = await updateDoc(doc(db, 'boards', id),req.body);
            res.status(200).json({ message: "Cập nhật board thành công" ,data: req.body});
        }catch(error){
            res.status(500).json({ message: error.message });  
        }
    },
    deleteBoardById: async (req, res) => {
        try{
            const { id } = req.params;
            if(!id){
                return res.status(404).json({ message: "Không tìm thấy board" });
            }
            const ref = await deleteDoc(doc(db, 'boards', id));

            res.status(204).send();
        }
        catch(error){
            res.status(500).json({ message: error.message });  
        }
    },
    createInvite : async( req, res) =>{
        const { id } = req.params;
        try{
            const {inviter_id, board_owner_id, member_id, email_member, status} = req.body;
            const ref = await addDoc(collection(db, 'boards', id, 'invites'), req.body);
            const inviteObject = { id: ref.id, inviter_id, board_owner_id, member_id, email_member, status };
            res.status(200).json(inviteObject);
        }
        catch(error){
            res.status(500).json({ message: error.message });
        }
    },
    

}

module.exports = boardController;