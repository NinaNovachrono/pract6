const cargarTipos = async()=>{
    try{
        const url = "http://201.140.116.237/services/tipo.php"
        await axios 
        .get(url)
        .then((res)=>{
            llenarCombos(res.data);
        })
        .catch((err)=>{
            console.log("Surgio un error en la peticiÃ³n" +err);
            return false;
        });
    }catch(error){
        console.log("Surgio un error"); 
        return false;
    }
    return true;
}

function llenarCombos(data){
    for( let item of data){
        document.getElementById("tipo").innerHTML += 
        `<option value ="${item.tipo}">${item.descripcion}</option>`
    }
    document.getElementById('tipo').innerHTML+=`
    </select>
    `
};

const cargarTablaVentas = async()=>{
    try{
        const urlVentas = "http://201.140.116.237/services/ventas.php" 
        await axios 
        .get(urlVentas)
        .then((res)=>{
            dibujarTabla(res.data);
    })
    .catch((err)=>{
        console.log("Surgio un error en la peticion" +err);
        return false; 
    });
    }catch(err){
        console.log("Surgio un error");
        return false;
    }
    return true;
}

function dibujarTabla(data){
    //limpiar la tabla
    document.getElementById("ventas").innerHTML=``;
    //sacar el tipo de combox
    let tipo = document.getElementById("tipo").value;

    for( let item of data){
        if( item.tipo == tipo){
            document.getElementById("ventas").innerHTML+=`
            <tr>
                <td>${item.folio}</td>
                <td>${item.tipo}</td>
                <td>${item.precio}</td>
                <td>${item.descuento}</td>
                <td>${item.total}</td>
                <td>${item.fechapago}</td>
                <td>${item.giro}</td>
            </tr>`
        }
    }
}

const inicia = async()=>{
    if(await cargarTipos() == true){
        cargarTablaVentas();
    }else{
        console.log("Surgio un error");
        
    }
    document.getElementById("tipo").addEventListener("change",async()=>{
    cargarTablaVentas();
});
}
    

inicia();
