window.onload = function () {
  const button = document.querySelector('#code-btn');
  const form = document.querySelector('#enter-form');
  const confirmButton = document.querySelector('#confirm-btn');
  const repeate = document.querySelector('#repeate');
  const inputs = document.querySelectorAll('.inp-disable');
  const time = document.querySelector('#time');

  function timer(m) {
    setTimeout(() => {
      time.innerHTML = m;
      if (m) {
        m -= 1;
        timer(m);
      }
    }, 1000);
  }

  function makeActive(items) {
    items.forEach((element) => {
      element.disabled = false;
    });
  }

  function makeDisable(items = inputs) {
    items.forEach((element) => {
      element.disabled = 'disabled';
    });
  }

  function NotANumberError(message, severity) {
    Error.captureStackTrace(this, this.constructor);

    this.name = "NotANumber";
    this.message = message;

    this.severity = severity || "error";
  }

  function EmptyNumberError(message, severity) {
    Error.captureStackTrace(this, this.constructor);

    this.name = "EmptyNumber";
    this.message = message;

    this.severity = severity || "error";
  }

  function removeAllValidationClasses(element) {
    element.classList.remove("validation-error");
    element.classList.remove("validation-success");
  }

  function checkOnError() {
    const inputs = document.querySelectorAll('.inputs');
    const inputsWrapper = document.querySelector('#wrap-inputs');
    let x;
    let countError = 0;
    inputs.forEach((element) => {
      x = element.value;

      try {
        if (x === '' || x === ' ') {
          throw new EmptyNumberError('Элемент пуст');
        }
        if (isNaN(x)) {
          throw new NotANumberError('Значение не является цифрой');
        }
        if (!countError) {
          inputsWrapper.dataset.validationMessage = '';
          removeAllValidationClasses(inputsWrapper);
          inputsWrapper.classList.add('validation-success');
        }
      } catch (err) {
        if (
          err instanceof NotANumberError ||
          err instanceof EmptyNumberError
        ) {
          inputsWrapper.dataset.validationMessage = err.message;

          removeAllValidationClasses(inputsWrapper);
          inputsWrapper.classList.add("validation-" + err.severity);
        }

        console.error(err, err.stack);
        countError += 1;
      }
    });
    return countError;
  }

  button.addEventListener('mouseover', (event) => {
    event.target.value = 'при наведении';
  });
  button.addEventListener('mouseout', (event) => {
    event.target.value = '';
  });
  button.addEventListener('click', () => {
    form.classList.add('-visible');
    makeActive(inputs);
    setTimeout(makeDisable, 60000);
    timer(59);
  });
  repeate.addEventListener('click', () => {
    makeActive(inputs);
    setTimeout(makeDisable, 60000);
    timer(59);
  });
  confirmButton.addEventListener('click', () => {
    if (!checkOnError()) {
      form.classList.toggle('-visible');
      console.log('true');
    } else {
      console.log('false');
    }
  });
};
