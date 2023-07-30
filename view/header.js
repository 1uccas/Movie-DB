document.write(
    `
    <style>
        @font-face{
            font-family: 'Lobster';
            src: url('/font/Lobster/Lobster-Regular.ttf') format('truetype');
        }

        body{
            padding: 0;
            margin: 0;
        }
        #header-box-container{
            font-family: 'Lobster', cursive;
            background: linear-gradient(to right, gray, white); 
            font-size: 50px;
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
            margin-top: -5px;
            margin-left: -75px;
            width: 70px;
        }
    </style>

    <div id="header-box-container">
        <header><a href='/index.html'><img src="/image/header-image/box.png"></img></a> Actors Box</header>
    </div>
    `
)
