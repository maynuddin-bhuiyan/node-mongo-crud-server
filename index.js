const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 7000;


//middleware

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Raneing My Pote")
});

app.listen(port, () => {
    console.log("Running Server on port ", port);
})



const uri = "mongodb+srv://uxUser:YOD533vKNAUo0aMO@cluster0.l2npz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run () {
    try{
        await client.connect();
        const database = client.db('HeltCare');
        const usersCollection = database.collection('users')

        // Post Api
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);

            console.log("Got New Users", req.body);
            console.log("Added Users", result);
            


            res.json(result)
        })
    
        
    }
    finally{
        // await client.close()
    }
};

run().catch(console.dir);


// User : uxUser
// Pass: YOD533vKNAUo0aMO