
const service = 'http://localhost:8000'

function AnonymousSignIn() {
  fetch(`${service}/universer-api/anonymous`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify({ "deviceID": "123ssx" })
  }).then(response => console.log(response)).then(() => {
    fetch(`${service}/universer-api/user`, {
      credentials: 'include',
    }).then(response => console.log(response))
  })
}

export default AnonymousSignIn
