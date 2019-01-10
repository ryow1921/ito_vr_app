function addQuizPannel(doc, sceneId, texts, problem, nextUrl) {
    var quizContaner = doc.createElement('a-entity');

    var problemText = doc.createElement('a-text');
    problemText.setAttribute('id', 'problem-T');
    problemText.setAttribute('text', 'align: center;width: 10;value:' + problem)
    problemText.setAttribute('rotation', '0 +50 0');
    problemText.setAttribute('position', '-5 0 -2');
    quizContaner.appendChild(problemText);

    var problemPlane = doc.createElement('a-plane');
    problemPlane.setAttribute('id', 'problem-P');
    problemPlane.setAttribute('color', 'black');
    problemPlane.setAttribute('scale', '13.5 2 1');
    problemPlane.setAttribute('rotation', '0 +50 0');
    problemPlane.setAttribute('position', '-5 0 -3');
    quizContaner.appendChild(problemPlane);

    var ansPositions = [{
        x: 7,
        y: -3,
        z: -10
    }, {
        x: 7,
        y: 0,
        z: -10
    }, {
        x: 7,
        y: 3,
        z: -10
    }];
    ansPositions = shuffle(ansPositions);

    for (var i = 0; i < ansPositions.length; i++) {
        var className = i == 0 ? 'answer-ok' : 'answer';
        var textPlane = createTextPlane(doc, ansPositions[i].x, ansPositions[i].y, ansPositions[i].z, texts[i], 'answer', className);
        quizContaner.appendChild(textPlane);
    }

    var scene = doc.getElementById(sceneId);
    scene.appendChild(quizContaner);

    var answerElements = Array.from(doc.getElementsByClassName("answer"));
    for (var i = 0; i < answerElements.length; i++) {
        answerElements[i].addEventListener('click', function () {
            addResultmissPannel(doc, sceneId, nextUrl);
            quizContaner.parentNode.removeChild(quizContaner);
        });
    }
    var answerokElement = Array.from(doc.getElementsByClassName("answer-ok"));
    for (var i = 0; i < answerokElement.length; i++) {
        answerokElement[i].addEventListener('click', function () {
            addResultcorrectPannel(doc, sceneId, nextUrl);
            quizContaner.parentNode.removeChild(quizContaner);

        });
    }
}

function createTextPlane(doc, x, y, z, text, id, className) {
    var answerText = doc.createElement('a-text');
    answerText.setAttribute('id', id);
    answerText.setAttribute('class', className);
    answerText.setAttribute('text', 'align: center;width: 10;value:' + text)
    answerText.setAttribute('position', x + ' ' + y + ' ' + z);
    answerText.setAttribute('rotation', '0 -30 0');

    var answerPlane = doc.createElement('a-plane');
    answerPlane.setAttribute('id', id + '-plane');
    answerPlane.setAttribute('class', className);
    answerPlane.setAttribute('color', 'black');
    answerPlane.setAttribute('scale', '13.5 2 1');
    answerPlane.setAttribute('rotation', '0 -30 0');
    answerPlane.setAttribute('position', x + ' ' + y + ' ' + z + '-5');

    var container = doc.createElement('a-entity');
    container.setAttribute('class', 'text-plane');
    container.appendChild(answerText);
    container.appendChild(answerPlane);

    return container;
}

function addResultmissPannel(doc, sceneId, nextUrl) {
    var scene = doc.getElementById(sceneId);
    var resultPlane = doc.createElement('a-plane');
    resultPlane.setAttribute('id', 'resultPlane');
    resultPlane.setAttribute('color', 'black');
    resultPlane.setAttribute('scale', '13.5 2 1');
    resultPlane.setAttribute('rotation', '0 -30 0');
    resultPlane.setAttribute('position', '7 6 -10');
    scene.appendChild(resultPlane);

    var resultText = doc.createElement('a-text');
    resultText.setAttribute('id', 'resultText');
    resultText.setAttribute('text', 'align: center;width: 10;value:miss')
    resultText.setAttribute('position', '7 6 -10');
    resultText.setAttribute('rotation', '0 -30 0');
    scene.appendChild(resultText);

    var nextPlane = doc.createElement('a-plane');
    nextPlane.setAttribute('id', 'nextPlane');
    nextPlane.setAttribute('color', 'black');
    nextPlane.setAttribute('scale', '13.5 2 1');
    nextPlane.setAttribute('rotation', '0 -30 0');
    nextPlane.setAttribute('position', '7 -6 -10');
    scene.appendChild(nextPlane);

    var nextText = doc.createElement('a-text');
    nextText.setAttribute('id', 'nextText');
    nextText.setAttribute('text', 'align: center;width: 10;value:next stage')
    nextText.setAttribute('rotation', '0 -30 0');
    nextText.setAttribute('position', '7 -6 -10');
    scene.appendChild(nextText);

    nextPlane.addEventListener('click', function () {
        location.href = nextUrl;
    });
}

function addResultcorrectPannel(doc, sceneId, nextUrl) {
    var scene = doc.getElementById(sceneId);
    var resultPlane = doc.createElement('a-plane');
    resultPlane.setAttribute('id', 'resultPlane');
    resultPlane.setAttribute('color', 'black');
    resultPlane.setAttribute('scale', '13.5 2 1');
    resultPlane.setAttribute('rotation', '0 -30 0');
    resultPlane.setAttribute('position', '7 6 -10');
    scene.appendChild(resultPlane);

    var resultText = doc.createElement('a-text');
    resultText.setAttribute('id', 'resultText');
    resultText.setAttribute('text', 'align: center;width: 10;value:correct')
    resultText.setAttribute('position', '7 6 -10');
    resultText.setAttribute('rotation', '0 -30 0');
    scene.appendChild(resultText);

    var nextPlane = doc.createElement('a-plane');
    nextPlane.setAttribute('id', 'nextPlane');
    nextPlane.setAttribute('color', 'black');
    nextPlane.setAttribute('scale', '13.5 2 1');
    nextPlane.setAttribute('rotation', '0 -30 0');
    nextPlane.setAttribute('position', '7 -6 -10');
    scene.appendChild(nextPlane);

    var nextText = doc.createElement('a-text');
    nextText.setAttribute('id', 'nextText');
    nextText.setAttribute('text', 'align: center;width: 10;value:next stage')
    nextText.setAttribute('rotation', '0 -30 0');
    nextText.setAttribute('position', '7 -6 -10');
    scene.appendChild(nextText);

    nextPlane.addEventListener('click', function () {
        location.href = nextUrl;
    });
}

function shuffle(list) {
    var i = list.length;
    while (--i) {
        var j = Math.floor(Math.random() * (i + 1));
        if (i == j) continue;
        var k = list[i];
        list[i] = list[j];
        list[j] = k;
    }
    return list;
}

function itemfound(doc, sceneId, nextURL, problem, posi, rote) {
    var quizContaner = doc.createElement('a-entity');
    quizContaner.setAttribute('id', 'main')

    var problemText = doc.createElement('a-text');
    problemText.setAttribute('id', 'problem-T');
    problemText.setAttribute('text', 'align: center;width: 10;value:' + problem)
    problemText.setAttribute('rotation', '0 50 0');
    problemText.setAttribute('position', '-5 0 -2');
    quizContaner.appendChild(problemText);

    var problemPlane = doc.createElement('a-plane');
    problemPlane.setAttribute('id', 'problem-P');
    problemPlane.setAttribute('color', 'black');
    problemPlane.setAttribute('scale', '13.5 2 1');
    problemPlane.setAttribute('rotation', '0 +50 0');
    problemPlane.setAttribute('position', '-5 0 -3');
    quizContaner.appendChild(problemPlane);

    var tresure = doc.createElement('a-box');
    tresure.setAttribute('id','tresure' );
    tresure.setAttribute('color', 'blue');
    tresure.setAttribute('scale', '1 1 1');
    tresure.setAttribute('position', posi);
    tresure.setAttribute('opacity', '1');
    quizContaner.appendChild(tresure);

    var scene = doc.getElementById(sceneId);
    scene.appendChild(quizContaner);

    tresure.addEventListener("click", function () {
        var scene = doc.getElementById(sceneId);
        var problemText = doc.createElement('a-text');
        problemText.setAttribute('id', 'problem-T');
        problemText.setAttribute('text', 'align: center;width: 25;value:look behind' )
        problemText.setAttribute('rotation', rote);
        problemText.setAttribute('position', posi);
        scene.appendChild(problemText);

        var problemPlane = doc.createElement('a-plane');
        problemPlane.setAttribute('id', 'problem-P');
        problemPlane.setAttribute('color', 'black');
        problemPlane.setAttribute('scale', '13.5 3 1');
        problemPlane.setAttribute('rotation', rote);
        problemPlane.setAttribute('position', posi);
        scene.appendChild(problemPlane);
        quizContaner.parentNode.removeChild(quizContaner);
        addResultcorrectPannel(doc, sceneId, nextURL);
    });
    
    
}
window.addEventListener('load', function () {
  var scene = document.querySelector('a-scene');
  if(!scene.isMobile) return;
  if (scene.hasLoaded ) {
    scene.enterVR();
  } else {
    scene.addEventListener('renderstart', function () {
      scene.enterVR();
    });
  }
});
