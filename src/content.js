function checkPush(arr, sel) {
  const str = sel.toString();
  if (str && !str.includes('\n')) {
    const numsArr = str.match(/\d+/g);
    if (numsArr && numsArr.length) {
      const nums = numsArr.join('');
      if (nums.length === 10 && !arr.includes(nums)) {
        arr.push(nums);
      }
    }
  }
}

function getSelectionText() {
  const s = window.getSelection();
  const p = [];
  if (s.isCollapsed) {
    s.modify('move', 'forward', 'character');
    s.modify('move', 'backward', 'word');
    s.modify('extend', 'forward', 'word'); // select word
    checkPush(p, s);
    s.modify('extend', 'forward', 'word'); // select 2 words behind and two in front and combos
    checkPush(p, s);
    s.modify('extend', 'forward', 'word');
    checkPush(p, s);
    s.modify('extend', 'backward', 'word');
    checkPush(p, s);
    s.modify('extend', 'backward', 'word');
    checkPush(p, s);
    s.modify('move', 'backward', 'word');
    checkPush(p, s);
    s.modify('move', 'backward', 'word');
    checkPush(p, s);
    s.modify('move', 'backward', 'word');
    checkPush(p, s);
    s.modify('extend', 'forward', 'word');
    s.modify('extend', 'forward', 'word');
    checkPush(p, s);
    s.modify('extend', 'forward', 'word');
    checkPush(p, s);
    s.modify('extend', 'forward', 'word');
    checkPush(p, s);
    s.modify('move', 'forward', 'character'); //clear selection
  } else {
    checkPush(p, s); // if highlighted
  }
  return p;
}

document.addEventListener('mouseup', function(evt) {

  const id = 'chrome-flex-call-container';
  const element = document.getElementById(id);

  if (element) {
    element.parentNode.removeChild(element);
  }

  const selected = getSelectionText();

  if (selected && selected.length) {
    const parent = document.createElement('div');
    parent.id = id;

    const h3 = document.createElement('h3');
    h3.innerText = selected[0];

    const buttonBlock = document.createElement('div');
    buttonBlock.classList.add('button-block');

    const buttonCall = document.createElement('button');
    buttonCall.id = 'chrome-flex-call';
    buttonCall.innerText = 'Call';

    const buttonText = document.createElement('button');
    buttonText.id = 'chrome-flex-text';
    buttonText.innerText = 'Text';

    buttonBlock.appendChild(buttonCall);
    buttonBlock.appendChild(buttonText);

    parent.appendChild(h3);
    parent.appendChild(buttonBlock);

    document.body.appendChild(parent);

    // these don't work as click events, but they do as mouse events (ie mouseover, mouseenter)
    buttonCall.addEventListener('click', function(e) {
      console.log('clicked on call');
    });
    buttonText.addEventListener('click', function() {
      console.log('clicked on text');
    });

    // test stuff
    parent.addEventListener('click', function(e) { // not working
      console.log('click', e);
    });
    buttonText.addEventListener('mouseover', function() { // working
      console.log('mouseover');
    });

  }
});
