import { Circle } from 'better-react-spinkit'

function Loading () {
  return (
    <center
      style={{
        display: 'grid',
        placeItems: 'center',
        backgroundColor: '#f3f3fdcc',
        height: '100vh'
      }}
    >
      <div>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/1200px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png'
          alt=''
          style={{ marginBottom: 10 }}
          height={200}
        />
        <h1 color='gray'>Loading....</h1>
        <h2 color='gray'>Please wait</h2>
        <Circle color='#505ac9' size={40} />
      </div>
    </center>
  )
}

export default Loading
