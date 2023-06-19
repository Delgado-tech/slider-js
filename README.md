<img src="https://capsule-render.vercel.app/api?type=waving&color=0:ffc373,50:faebd7,100:ffcc8a&height=150&section=header" width="100%">


<img src="https://github.com/Delgado-tech/slider-js/assets/60985347/cc408fdb-4b53-45ec-84c8-2de891d1d619" width="5%" align="left">
<h1>Slider JS</h1>

<p>O repositório que se encontra tem como o objetivo de fornecer um código pronto elaborado pelo autor e insinar a utilização dele, o código pode ser alterado posteriormente para deixar o funcionamento ao gosto do leitor.</p>
<p>Para o uso do código de maneira livre é necessário o utilizador informar os créditos do autor (Leonardo Delgado), caso tenha sido feita qualquer modificação no código informar junto aos créditos (ex.: <code>Slider.js by: Leonardo Delgado. The code has modifications by the user.</code>)</p>

<h2>Menu degustação</h2>
<b>Link: </b> <br>
<b>Previsualização:</b>
<img src="https://github.com/Delgado-tech/slider-js/assets/60985347/1a75ee6d-d55a-43dd-a4c2-9281835894d5">


<h2 id="sumario">Sumário</h2>
<a href="#topico1"><strong>1. Funcionamento</strong></a> <br>
<a href="#"><strong>2. Configuração do slider</strong></a> <br>
<a href="#"><strong>2.1 Configuração do indicador (Opcional)</strong></a> <br>
<a href="#"><strong>2.2 Configuração dos destaques (Opcional)</strong></a>


<h2 id="topico1">1. Funcionamento</h2>
<blockquote>Um slider é um elemento de interface com o usuário comumente usado em aplicativos e sites para permitir que os usuários selecionem um valor em um intervalo específico. Ele normalmente consiste em uma barra horizontal com um indicador que pode ser arrastado para a esquerda ou direita.</blockquote>

<p>O funcionamento é simples, basta copiar a estrutura html informada nesse artigo, e utilizar data-tags para customizar seu slider e alterar classes especificas do css para uma edição visual.</p>

<h2 id="topico2">2. Configuração do slider</h2>
<p>Faça o download da pasta <code>0-slider-template</code> presente nesse repositório, dentro dessa pasta já terá os arquivo pre-moldados com algumas informações, se deseja realizar a inserção do zero, siga os passos a seguir:</p>

<br>

<p>Primeiro passo, dentro da pasta informada acima, copie os arquivos <code>slider.js</code> e <code>slider.css</code> e cole em seu projeto.</p>
<p>Segundo passo, referencie esses arquivos em seu arquivo html que irá utiliza-los.</p>


```html
<html>
<head>
    <!-- Imports -->
    <link rel="stylesheet" href="./slider.css">
    <script src="./slider.js"></script>
    <!------------->
</head>
<body>
</body>
</html>
```
<br>
<p>Terceiro passo, crie uma section com a classe <code>slider-container</code> (caso a sua página venha a possuir mais de um slider crie um id para identifica-lo) onde será configurado a maior parte do funcionamento do slider, dentro dela crie uma div com a classe <code>slider</code> e outras duas divs com a classe <code>slider-btn</code> (essas duas divs servirão como botões para navegar dentro no slider) e coloque em uma a classe <code>slider-btn-left</code> e em outra a classe <code>slider-btn-right</code> para posicionar os botões.</p>

```html
<section id="slider-something" class="slider-container">
    <div class="slider">
    </div>
    <!-- Buttons -->
    <div class="slider-btn slider-btn-left"><button>&lt;</button></div> <!-- &lt; é o código do simbolo menor que ("<") -->
    <div class="slider-btn slider-btn-right"><button>&gt;</button></div> <!-- &lt; é o código do simbolo maior que (">") -->
</section>
```

<p>Quarto passo, crie os cards que irão passar em seu slider (não há limites no número de cards), para isso, dentro da div slider, crie uma div com a classe <code>card-wrapper</code> e dentro dessa div crie uma div com a classe <code>card-image</code> e outra div com a classe <code>card-content</code>, dentro de card-content crie um dois elementos um com a classe <code>card-title</code> e outro com a classe <code>card-description</code>.</p>

```html
<div class="slider">
    <div class="card-wrapper">
        <div class="card-image"></div>
        <div class="card-content">
            <h3 class="card-title">titulo</h3>
            <p class="card-description">Descrição</p>
        </div>
    </div>
</div> 
```


