const axios = require('axios').default


async function app(){
    const response = await axios.get('http://localhost:3000/produtos')
    console.log(response.data)

}

app()

