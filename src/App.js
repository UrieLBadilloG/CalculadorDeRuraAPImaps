import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'
import sample from "./sample.json"

const center = { lat: 19.432798623260396, lng: -99.1294855652893 }
const center1 = { lat: 19.398466784087013, lng: -98.02660013408719 }

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState([])
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')



  const locations = [
    {
      lat: 19.432798623260396,
      lng: -99.1294855652893
    },
    { lat: 19.424173594248934, lng: -99.1656703508789 }, // Puebla
    { lat: 19.41316464501124, lng: -99.17802997001952 }, // Chiapas
    { lat: 19.409602766509803, lng: -99.19141955742187 }, // Cancún
  ]

//   const routes =
//   { ruta:
//   [
//     {
//       origin: {
//         lat: 19.432798623260396,
//         lng: -99.1294855652893
//       },
//       route: [
//         [
//           { lat: 19.45044282788045, lng: -99.10274671754753 },
//           { lat: 19.47569174575162, lng: -99.0735642834655 },
//           { lat: 19.47500813674322, lng: -99.04346466064453 },
//           { lat: 19.492845817159175, lng: -99.02288605751953 },
//         ],
//         [
//           { lat: 19.424173594248934, lng: -99.1656703508789 },
//           { lat: 19.41316464501124, lng: -99.17802997001952 },
//           { lat: 19.409602766509803, lng: -99.19141955742187 },
//         ],
//         [
//           { lat: 19.41628579624565, lng: -99.11695428477172 },
//           { lat: 19.409162097968117, lng: -99.1104311524475 },
//           { lat: 19.40560013179395, lng: -99.10665460215453 },
//           { lat: 19.40572577558053, lng: -99.09290313720703 },
//           { lat: 19.39135148714261, lng: -99.08844632695312 },
//         ]
//       ]
//     },
//     {
//       origin: {
//         lat: 19.483258417602674,
//         lng: -99.15488930976312
//       },
//       route: [
//         [
//           { lat: 19.492336372654254, lng: -99.14994985889757 },
//           { lat: 19.501721822866156, lng: -99.14411337208116 }
//         ],
//         [
//           { lat: 19.48280885452541, lng: -99.15885470847103 },
//           { lat: 19.484265338873808, lng: -99.16434787253353 },
//           { lat: 19.485074491184914, lng: -99.17310260275814 }
//         ]
//       ]
//     },
//   ]
// }

  const routes = {
    locations: [
      [
        { lat: 19.45044282788045, lng: -99.10274671754753 },
        { lat: 19.47569174575162, lng: -99.0735642834655 },
        { lat: 19.47500813674322, lng: -99.04346466064453 },
        { lat: 19.492845817159175, lng: -99.02288605751953 },
      ], // New York, NY
      [
        { lat: 19.424173594248934, lng: -99.1656703508789 }, // Puebla
        { lat: 19.41316464501124, lng: -99.17802997001952 }, // Chiapas
        { lat: 19.409602766509803, lng: -99.19141955742187 }, // Cancún
      ],
      [
        { lat: 19.41628579624565, lng: -99.11695428477172 }, // Puebla
        { lat: 19.409162097968117, lng: -99.1104311524475 }, // Chiapas
        { lat: 19.40560013179395, lng: -99.10665460215453 }, // Cancún
        { lat: 19.40572577558053, lng: -99.09290313720703 },
        { lat: 19.39135148714261, lng: -99.08844632695312 },
      ]
    ],
    origin: [
      {
        lat: 19.432798623260396,
        lng: -99.1294855652893
      }, 
      
    ]
  }




  const locationsRef = useRef(locations)
  const locationsJSON = useRef(routes)
  const sampleJSON = useRef(sample)
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }


// async function calculateRoute() {
  //   var j = 0;
  //   if (locationsRef.current.length < 2) {
  //     return
  //   }
  //   // eslint-disable-next-line no-undef
  //   const directionsService = new google.maps.DirectionsService()
  //   // eslint-disable-next-line no-undef


  //   let results = [];
  //   while (j < locationsJSON.current.locations.length) {

  //     // eslint-disable-next-line no-undef
  //     let waypoints = locationsJSON.current.locations[j].slice(0, -1).map(location => ({ location }));
  //     let origin = locationsJSON.current.origin[0]
  //     let destination = locationsJSON.current.locations[j][locationsJSON.current.locations[j].length - 1]
  //     results[j] = await directionsService.route({
  //       origin,
  //       destination,
  //       waypoints,
  //       // eslint-disable-next-line no-undef
  //       travelMode: google.maps.TravelMode.DRIVING,

  //     })
  //     // eslint-disable-next-line no-undef
  //     const flightPath = new google.maps.Polyline({
  //       geodesic: true,
  //       strokeColor: "red",
  //       strokeOpacity: 1.0,
  //       strokeWeight: 2,
  //     });
  //     results[j].polyline = flightPath;
  //     setDirectionsResponse(prevState => {
  //       const newState = [...prevState];
  //       newState[j] = results[j];
  //       return newState;
  //     });

  //     setDistance(results[0].routes[0].legs.reduce((acc, leg) => acc + leg.distance.value, 0) / 1000)
  //     setDuration(results[0].routes[0].legs.reduce((acc, leg) => acc + leg.duration.value, 0) / 60)
  //     j++
  //   }
  // }

  // console.log(sampleJSON.current.ruta[1].route[0].slice(0, -1))
  // console.log(sampleJSON.current.ruta[0].origin)
  console.log(sampleJSON.current.ruta[0].route[0][sampleJSON.current.ruta[0].route[0].length - 1])

  async function calculateRoute() {
    var j = 0;
    if (sampleJSON.current.ruta.length < 2) {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    // eslint-disable-next-line no-undef


    let results = [];
    while (j < sampleJSON.current.ruta.length) {

      // eslint-disable-next-line no-undef
      let waypoints = sampleJSON.current.ruta[j].route[0].slice(0, -1).map(location => ({ location }));
      let origin = sampleJSON.current.ruta[j].origin
      let destination = sampleJSON.current.ruta[j].route[0][sampleJSON.current.ruta[j].route[0].length - 1]
      results[j] = await directionsService.route({
        origin,
        destination,
        waypoints,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,

      })
      // eslint-disable-next-line no-undef
      const flightPath = new google.maps.Polyline({
        geodesic: true,
        strokeColor: "red",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      results[j].polyline = flightPath;
      setDirectionsResponse(prevState => {
        const newState = [...prevState];
        newState[j] = results[j];
        return newState;
      });

      setDistance(results[0].routes[0].legs.reduce((acc, leg) => acc + leg.distance.value, 0) / 1000)
      setDuration(results[0].routes[0].legs.reduce((acc, leg) => acc + leg.duration.value, 0) / 60)
      j++
    }
  }


  // eslint-disable-next-line no-undef
  var polylineOptionsActual = new google.maps.Polyline({
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 10
  });
  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={10}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            // zoomControl: false,
            // streetViewControl: false,
            // mapTypeControl: false,
            // fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          <Marker position={center1} />
          {directionsResponse.map(directions => (
            <DirectionsRenderer directions={directions} polylineOptions={polylineOptionsActual} />
          ))}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          />
        </HStack>
      </Box>
    </Flex>
  )
}

export default App
