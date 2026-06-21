const {addDoc,collection,getDocs,getDoc, updateDoc,doc,deleteDoc,exists,query,where,some,setDoc} = require('firebase/firestore');
const {db} = require('../configs/firebase-config.js');

const taskController = {
    createNewTask: async (req, res) => {
        const {boardId, cardId} = req.params;
        const ownId = req.user.id;
        try{
            const {title, description,status} = req.body;
            const taskObject = { cardId,ownId,title, description, status };
            const ref = await addDoc(collection(db, 'boards', boardId, 'cards', cardId, 'tasks'), taskObject);
            console.log(ref.id);
            res.status(201).json({ id: ref.id, ...taskObject });
        }
        catch(error){
            res.status(500).json({ message: error.message });
        }
    },
    getAllTasks: async (req, res) => {
        const {boardId, cardId} = req.params;
        try{
            const taskRef = await getDocs(collection(db,'boards', boardId,'cards',cardId,'tasks'));
            const getAllTasks = taskRef.docs.map((item) => ({id:item.id, ...item.data()}));
            res.status(200).json(getAllTasks);

        }catch(error){
            res.status(500).json({ message: error.message });
        }
    },
    taskById: async (req, res) => {

        const {boardId, cardId, id} = req.params;
        try{
            const {...data} = req.body;
            const taskById =  await getDoc(doc(db, 'boards', boardId, 'cards', cardId, 'tasks', id));
            res.status(200).json({ id: taskById.id, ...data });
        }
        catch(error){
            res.status(500).json({ message: error.message });
        }
        
    },
    updateTaskById: async (req, res) => {
        const {boardId, cardId, id} = req.params;
  
        try{
            const {cardId: newCardId, ...data} = req.body;
            const ref = doc(db, 'boards', boardId, 'cards', cardId, 'tasks', id);
            const snap = await getDoc(ref);
            if (!snap.exists()) {
                return res.status(404).json({ message: "Task không tồn tại" });
            }
            const task = snap.data();
            if(!newCardId || newCardId === cardId){
                await updateDoc(ref, data);
                return res.status(200).json({ message: "Cập nhật task thành công" ,data: req.body});
            }
            await setDoc(doc(db, 'boards', boardId, 'cards', newCardId, 'tasks',id), {...task,...data,cardId: newCardId});
            await deleteDoc(ref);
            return res.status(200).json({ message: "Cập nhật chuyển task thành công" ,data: req.body});
        
        }
        catch(error){
            console.log("boardId:", boardId);
console.log("cardOldId:", cardOldId);
console.log("id:", id);
console.log("body:", req.body);
            res.status(500).json({ message: error.message });
        }
    },
    deleteTaskById: async (req, res) => {
        const {boardId, cardId, id} = req.params;   
        try{
            const ref = await deleteDoc(doc(db, 'boards', boardId, 'cards', cardId, 'tasks', id));
            res.status(200).send();

        }
        catch(error){
            res.status(500).send({ message: error.message });
        }
    },
    createAssign: async(req,res) => {
        const {boardId, cardId, taskId} = req.params;
        
        try{
            const taskRef = doc(db, 'boards', boardId, 'cards', cardId, 'tasks', taskId);
            const taskDoc = await getDoc(taskRef);
            const addAssign = await updateDoc(taskRef, { assign: req.body.assign });
            res.status(200).json({ message: "Cập nhật assign thành công" ,data: req.body});
        }
        catch(error){
            res.status(500).json({ message: error.message });
        }
    },
    
}

module.exports = taskController;