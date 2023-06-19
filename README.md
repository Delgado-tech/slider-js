<img src="https://capsule-render.vercel.app/api?type=waving&color=0:ffc373,50:faebd7,100:ffcc8a&height=150&section=header" width="100%">


<img src="https://github.com/Delgado-tech/slider-js/assets/60985347/cc408fdb-4b53-45ec-84c8-2de891d1d619" width="5%" align="left">
<h1>Slider JS</h1>

<p>O repositório que se encontra tem como o objetivo de fornecer um código pronto elaborado pelo autor e insinar a utilização dele, o código pode ser alterado posteriormente para deixar o funcionamento ao gosto do leitor.</p>
<p>Para o uso do código de maneira livre é necessário o utilizador informar os créditos do autor (Leonardo Delgado), caso tenha sido feita qualquer modificação no código informar junto aos créditos (ex.: <code>Slider.js by: Leonardo Delgado. The code has modifications by the user.</code>)</p>

<h2>Menu degustação</h2>
<b>Link: </b> <br>
<b>Previsualização:</b>
<img src="https://github.com/Delgado-tech/slider-js/assets/60985347/1a75ee6d-d55a-43dd-a4c2-9281835894d5">

#

<br><br><br><br>

<h2 id="sumario">Sumário</h2>
<a href="#topico1"><strong>1. Funcionamento</strong></a> <br>
<a href="#topico2"><strong>2. Configuração do slider</strong></a> <br>
<a href="#t2-datatags"><strong>2.1 Data-tags do slider</strong></a> <br>
<a href="#topico3"><strong>3. Configuração dos slider refs (Opcional)</strong></a>
<a href="#"><strong>4. Configuração do indicador ref (Opcional)</strong></a> <br>

<br><br><br><br>

#

<h2 id="topico1">1. Funcionamento</h2>
<blockquote>
    Um slider é um elemento de interface com o usuário comumente usado em aplicativos e sites para permitir que os usuários selecionem um valor em um intervalo específico. Ele normalmente consiste em uma barra horizontal com um indicador que pode ser arrastado para a       esquerda ou direita.
</blockquote>

<p>O funcionamento é simples, basta copiar a estrutura html informada nesse artigo, e utilizar data-tags para customizar seu slider e alterar classes especificas do css para uma edição visual.</p>

<br><br>

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
<p>Terceiro passo, crie uma section com a classe <code>slider-container</code> (caso a sua página venha a possuir mais de um slider crie um id para identifica-lo) onde será configurado a maior parte do funcionamento do slider (para configurar o slider utilize essas <a href="#t1-datatags">data-tags</a>), dentro dela crie uma div com a classe <code>slider</code> e outras duas divs com a classe <code>slider-btn</code> (essas duas divs servirão como botões para navegar dentro no slider) e coloque em uma a classe <code>slider-btn-left</code> e em outra a classe <code>slider-btn-right</code> para posicionar os botões.</p>

```html
<section id="slider-something" class="slider-container">
    <div class="slider">
    </div>
    <!-- Buttons -->
    <div class="slider-btn slider-btn-left"><button>&lt;</button></div> <!-- &lt; é o código do simbolo menor que ("<") -->
    <div class="slider-btn slider-btn-right"><button>&gt;</button></div> <!-- &lt; é o código do simbolo maior que (">") -->
</section>
```

<br>
<p>Quarto passo, crie os cards que irão passar em seu slider (não há limites no número de cards), para isso, dentro da div slider, crie uma div com a classe <code>card-wrapper</code> e dentro dessa div crie uma div com a classe <code>card-image</code> e outra div com a classe <code>card-content</code>, dentro de card-content crie um dois elementos um com a classe <code>card-title</code> e outro com a classe <code>card-description</code>. Agora para adicionar mais card basta copiar e coloar a div card-wrappers quantas vezes desejar.</p>

```html
<!--<div class="slider">-->
    <div class="card-wrapper">
        <div class="card-image"></div>
        <div class="card-content">
            <h3 class="card-title">titulo</h3>
            <p class="card-description">Descrição</p>
        </div>
    </div>
    <!-- [...] -->
```

<br>
<blockquote> 
    Você pode esconder informações do cartão colocando ao lado da classe card-wrapper as classes <code>hidden-image"</code> para imagens e <code>hidden-content</code> para o conteúdo.
</blockquote>

```html
    <div class="card-wrapper hidden-image">
        <!-- [...] -->
    </div>
    
    <div class="card-wrapper hidden-content">
        <!-- [...] -->
    </div>
```

<br>
<blockquote> 
    Você pode também mudar a orientação do itens, ao invés de ficar a imagem acima ou abaixo do texto, ela pode ficar ao lado do texto, para isso basta colocar ao lado da classe card-wrapper a classe <code>card-wrapper-grid-column</code> para o conteúdo.
</blockquote>

```html
    <div class="card-wrapper card-wrapper-grid-column">
        <!-- [...] -->
    </div>
```

<br>
<p>Quinto passo, depois de concluirmos a nossa estrutura HTML, precisamos referencia-la em um arquivo JS que conectará o seu arquivo HTML com o arquivo slider.js, para isso vamos criar um outro arquivo chamado <code>index.js</code> e nele colocar o código a seguir.</p>

```js
// cria uma constante que receberá todos os sliders dentro do documento
const sliderContainers = document.querySelectorAll(".slider-container");

//para cada elemento HTML com a classe "slider-container" instância a classe slider que usa como parâmetro esse elemento.
sliderContainers.forEach(sliderContainer => {
    new slider(sliderContainer);
});
```

<br>
<p>Por fim, no final do documento HTML chame esse arquivo.</p>

```html
<!-- [...] -->
    <script src="./scripts/main.js"></script>
</body>
</html>
```

<br>
<br>

<h2 id="t2-datatags">2.1 Data-tags do slider</h2>
<p>As data-tags permitem configurar o funcionamento do slider em questão, veja abaixo cada uma delas e o que fazem:</p>

<table>
    <thead>
        <tr>
            <th>Data-tag</th>
            <th>Exemplo</th>
            <th>Descrição</th>
        </tr>
    </thead>
    <tbody>
        <!-- Linha 1 -->
        <tr>
            <td align="center"><pre>data-slider-image-src</pre></td>
            <td align="center"><code>data-slider-image-src="./assets/slider-images/photo-{id}.svg"</code></td>
            <td align="center">Define o caminho onde serão encontradas as imagens de cada card (obs: as imagens devem estar no mesmo diretório, possuindo o mesmo nome seguido do número do card e onde conterá esse número escreva "{id}" na data-tag como no exemplo)</td>
        </tr>
        <!-- Linha 2 -->
        <tr>
            <td align="center"><pre>data-slider-width</pre></td>
            <td align="center"><code>data-slider-width="80%"</code></td>
            <td align="center">Define a largura do container do slider</td>
        </tr>
        <!-- Linha 3 -->
        <tr>
            <td align="center"><pre>data-slider-height</pre></td>
            <td align="center"><code>data-slider-height="auto"</code></td>
            <td align="center">Define a altura do container do slider</td>
        </tr>
        <!-- Linha 4 -->
        <tr>
            <td align="center"><pre>data-slider-size</pre></td>
            <td align="center"><code>data-slider-size="80% auto"</code></td>
            <td align="center">Define a largura e a altura do container do slider simultaneamente</td>
        </tr>
        <!-- Linha 5 -->
        <tr>
            <td align="center"><pre>data-slider-card-width</pre></td>
            <td align="center"><code>data-slider-card-width="400px"</code></td>
            <td align="center">Define a largura dos cards (obs: a altura é com base na altura do container do slider)</td>
        </tr>
        <!-- Linha 6 -->
        <tr>
            <td align="center"><pre>data-slider-scroll-start</pre></td>
            <td align="center"><code>data-slider-scroll-start="10 10"</code></td>
            <td align="center">Define um scroll inicial para o slider, o primeiro valor irá afetar todo o scroll, já o segundo só irá afetar o scroll ao a página ser carregada</td>
        </tr>
        <!-- Linha 7 -->
        <tr id="t2-datatags-endless">
            <td align="center"><pre>data-slider-endless</pre></td>
            <td align="center"><code>data-slider-endless="true"</code></td>
            <td align="center">Ativa ou desativa o modo carrossel (obs: algumas funcionalidades não funcionam sem esse modo ativo)</td>
        </tr>
        <!-- Linha 8 -->
        <tr>
            <td align="center"><pre>data-auto-card-disposition</pre></td>
            <td align="center"><code>data-auto-card-disposition="true"</code></td>
            <td align="center">Ativa ou desativa o ajuste automático do tamanho dos cards para não sobrarem na tela</td>
        </tr>
        <!-- Linha 9 -->
        <tr>
            <td align="center"><pre>data-slider-auto-flow</pre></td>
            <td align="center"><code>data-slider-auto-flow="true 2000 10000"</code></td>
            <td align="center">Ativa ou desativa o scroll automático dos cards, onde o segundo valor representa o intervalo entre um scroll e outro, e o terceiro valor representa um intervalo de repouso ao detectar qualquer interatividade do usuário com o slider (ambos valores são em milissegundos)</td>
        </tr>
        <!-- Linha 10 -->
        <tr>
            <td align="center"><pre>data-refs-indicator</pre></td>
            <td align="center"><code>data-refs-indicator="true"</code></td>
            <td align="center">Ativa ou desativa o indicator ref (veja a <a href="#t2-datatags-refimg">imagem de referência</a>)</td>
        </tr>
        <!-- Linha 11 -->
        <tr>
            <td align="center"><pre>data-refs-slider</pre></td>
            <td align="center"><code>data-refs-slider="true"</code></td>
            <td align="center">Ativa ou desativa os slider refs (veja a <a href="#t2-datatags-refimg">imagem de referência</a>)</td>
        </tr>
    </tbody>
</table>

<br>
<h3 id="t2-datatags-refimg">Imagem de referência:</h3>
<img src="https://github.com/Delgado-tech/slider-js/assets/60985347/909381c6-3c07-4d20-a552-07559e921432">

<br><br>

<h2 id="topico3">3. Configuração dos slider refs (Opcional)</h2>
<p>O slider ref (veja a <a href="#t2-datatags-refimg">imagem de referência</a>) é uma div a parte onde pode mostrar os valores do cartão que está em destaque do slider (obs: não há limite nos sliders refs que você pode criar, mas recomenda-se criar apenas um por slider; obs2: os slider refs funcionam apenas com o modo <a href="#t2-datatags-endless">carrossel ativo</a>)</p>

