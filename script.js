let participants = [
  {
    name: 'Diego Fernandes',
    email: 'diego@gmail.com',
    subscriptionDate: new Date(2024, 2, 1, 19, 23),
    checkInDate: new Date(2024, 2, 1, 20, 20)
  },
  {
    name: 'Mayk Brito',
    email: 'mayk@gmail.com',
    subscriptionDate: new Date(2024, 2, 23, 19, 23),
    checkInDate: null
  },
  {
    name: 'Ana Souza',
    email: 'ana@gmail.com',
    subscriptionDate: new Date(2024, 0, 3, 19, 23),
    checkInDate: new Date(2024, 0, 4, 20, 20)
  },
  {
    name: 'João Silva',
    email: 'joao@gmail.com',
    subscriptionDate: new Date(2023, 11, 4, 19, 23),
    checkInDate: new Date(2023, 11, 5, 20, 20)
  },
  {
    name: 'Maria Oliveira',
    email: 'maria@gmail.com',
    subscriptionDate: new Date(2023, 10, 5, 19, 23),
    checkInDate: null
  },
  {
    name: 'Pedro Santos',
    email: 'pedro@gmail.com',
    subscriptionDate: new Date(2023, 9, 6, 19, 23),
    checkInDate: new Date(2023, 9, 7, 20, 20)
  },
  {
    name: 'Carla Lima',
    email: 'carla@gmail.com',
    subscriptionDate: new Date(2023, 8, 7, 19, 23),
    checkInDate: new Date(2023, 8, 8, 20, 20)
  },
  {
    name: 'Lucas Sousa',
    email: 'lucas@gmail.com',
    subscriptionDate: new Date(2023, 7, 8, 19, 23),
    checkInDate: new Date(2023, 7, 9, 20, 20)
  },
  {
    name: 'Paula Costa',
    email: 'paula@gmail.com',
    subscriptionDate: new Date(2023, 6, 9, 19, 23),
    checkInDate: null
  },
  {
    name: 'Gabriel Almeida',
    email: 'gabriel@gmail.com',
    subscriptionDate: new Date(2023, 5, 10, 19, 23),
    checkInDate: null
  }
]

const createNewParticipant = participant => {
  const subscriptionDate = dayjs(Date.now()).to(participant.subscriptionDate)

  let checkInDate = dayjs(Date.now()).to(participant.checkInDate)

  if (participant.checkInDate == null) {
    checkInDate = `
      <button
        data-email="${participant.email}"
        onclick="confirmCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participant.name}
      </strong>
      <br>
      <small>
        ${participant.email}
      </small>
    </td>
    <td>${subscriptionDate}</td>
    <td>${checkInDate}</td>
  </tr>
  `
}

const updateList = participants => {
  let output = ''
  for (let participant of participants) {
    output = output + createNewParticipant(participant)
  }

  document.querySelector('tbody').innerHTML = output
}

updateList(participants)

const addParticipant = event => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participant = {
    name: formData.get('name'),
    email: formData.get('email'),
    subscriptionDate: new Date(),
    checkInDate: null
  }

  const participantExists = participants.find(p => p.email == participant.email)

  if (participantExists) {
    alert('Email já cadastrado!')
    return
  }

  participants = [participant, ...participants]
  updateList(participants)

  event.target.querySelector('[name="name"]').value = ''
  event.target.querySelector('[name="email"]').value = ''
}

const confirmCheckIn = event => {
  const confirmationMsg = 'Tem certeza que deseja fazer o check-in?'

  if (confirm(confirmationMsg) == false) {
    return
  }

  const participant = participants.find(
    p => p.email == event.target.dataset.email
  )

  participant.checkInDate = new Date()

  updateList(participants)
}
