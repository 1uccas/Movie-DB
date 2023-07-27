document.write(
    `
    <style>
        body{
            padding: 0;
            margin: 0;
        }
        #header-box-container{
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            background: linear-gradient(to right, gray, white); 
            font-size: 45px;
            text-align: center;
            padding: 1rem;
            margin-bottom: 30px;
            color: black;
            font-weight: 400;
        }
        #header-box-container header{
            margin-left: 50px;
        }
        #header-box-container img{
            position: absolute;
            margin-top: -10px;
            margin-left: -75px;
            width: 70px;
        }
    </style>

    <div id="header-box-container">
        <header><img src="/image/header-image/camaleao.png"></img> Movies-Extreme</header>
    </div>
    `
)
