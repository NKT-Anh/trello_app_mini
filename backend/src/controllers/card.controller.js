const {addDoc,collection,getDocs,getDoc, updateDoc,doc,deleteDoc,exists,query,where,some} = require('firebase/firestore');
const {db} = require('../configs/firebase-config.js');


const cardController = {
        
    createNewCard: async (req, res) => {
        const {boardId} = req.params;
        const {name, description} = req.body;
        
        try{
            const cardObject = { name, description, createdAt: new Date().toISOString() };
            const card = await addDoc(collection(db, 'boards', boardId, 'cards'),cardObject);
            res.status(200).json({ id: card.id, ...cardObject });
            console.log(boardId);
        }
        catch(error){
            res.status(500).json({ message: error.message });
            console.log(boardId);
        }
    },
    getAllCards: async (req, res) => {
        const {boardId} = req.params;
        try{
            const ref = await getDocs(collection(db, 'boards', boardId, 'cards'));

            const getAllCards = ref.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            console.log(boardId, getAllCards);
            res.status(200).json(getAllCards);
        }catch(error){
            res.status(500).json({ message: error.message });
        }
    },
    getCardById: async (req, res) => {
        const {boardId, id} = req.params;
        try{
            const ref = await getDoc(doc(db,'boards' , boardId , 'cards', id));
            if (!ref.exists()) {
                return res.status(404).json({ message: 'Card not found' });
            }
            const getCardById = {id: ref.id, ...ref.data()};
            res.status(200).json(getCardById);
            console.log(boardId, "\n",id, getCardById);
        }
        catch(error){
            res.status(500).json({ message: error.message });
        }
    },
    updateCardById: async (req, res) => {
        const {boardId, id} = req.params;
        const {name, description,...params} = req.body;
        try{
            const ref= await updateDoc(doc(db,'boards',boardId,'cards',id),req.body);
            res.status(200).json({message:'update', data:req.body});
            console.log(boardId, "\n",id, req.body);
        }
        catch(error){
            res.status(500).json({ message: error.message });
        }
    },
    deleteCardById: async (req, res) => {
        const {boardId, id} = req.params;
        try{
            if(!boardId && !id){
                res.status(404).json({ message: "Không tìm thấy card" });
                return;
            }
            const ref= await deleteDoc(doc(db,'boards',boardId,'cards',id));
            res.status(204).send();

        }catch(error){
            res.status(500).json({ message: error.message });
        }
    },  
    getCardsByUserId: async (req, res) => {
        const {boardId,id} = req.params;
        try{
            const boardRef = doc(db, 'boards', boardId);
            const cardsRef =await getDocs(collection(boardRef, 'cards'));
            const cardObject = cardsRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((card) => 
            {
                if (!card.list_member || !Array.isArray(card.list_member)) {
                    return false; 
                }
                return card.list_member.some((member) => String(member) === String(id));
            });
                
            res.status(200).json(cardObject);
            console.log(boardId, "\n",id);
        }catch(error){
            console.log(boardId, "\n",id);
            res.status(500).json({ message: error.message });
        }
        
    },

    acceptOrRejectInvite: async (req, res) => {
        const {boardId,} = req.params;
        const {cardId, inviteId,memberId,status} = req.body;
        try{
            const boardRef = doc(db, 'boards', boardId);
            const cardRef = await getDoc (boardRef, 'cards', cardId);
            const inviteRef = await getDoc(cardRef, 'invites', inviteId);
            if( !boardRef || !cardRef || !inviteRef){
                return res.status(404).json({ message: "Không tìm thấy invite" });
            }
            if(inviteRef.data().status == 'pending'){
                await updateDoc(inviteRef, { status: status });
                if(status == 'accepted'){
                    const cardData = cardRef.data();
                    const list_member = cardData.list_member || [];
                    if(!list_member.includes(memberId)){
                        list_member.push(memberId);
                        await updateDoc(cardRef, { list_member: list_member });
                    }
                }
                else if(status == 'rejected'){
                    res.status(200).json({ message: "Invite rejected" });
                }
            }

        }
        catch(error){
            res.status(500).json({ message: error.message });
        }
    },


}

module.exports = cardController;