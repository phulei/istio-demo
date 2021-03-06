// Import React
import React from 'react';

// Import Spectacle Core tags
import {
  Deck,
  Heading,
  Slide,
  Image,
  Text
} from 'spectacle';
import CodeSlide from 'spectacle-code-slide';
import Terminal from "spectacle-terminal";
// Import theme
import createTheme from 'spectacle/lib/themes/default';
import App from '../app/App';
import Architecture from '../components/Architecture/index.jsx';
import GenericLogo from '../assets/istio-icon.svg';
import DigioLogo from '../assets/digio-logo.svg';
import IstioLogo from '../assets/istio-icon.svg'
// import OtherLogo from '../assets/logo3.svg';
import Github from '../assets/github.svg';

import 'normalize.css';
const vsCode = require('raw-loader!../assets/example.code.js')
const theme = createTheme(
  {
    primary: 'white',
    frontPage: '#f6f9ff',
    frontPagePrimary: 'black',
    frontPageSecondary: '#868686',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quaternary: '#CECECE',
    codeBackground: '#72a0f5',

  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica'
  }
)

export default class Presentation extends React.Component {
  render () {
    return (
      (
        <Deck
          contentWidth={1400}
          contentHeight={1200}
          transition={['zoom', 'slide']}
          transitionDuration={500}
          theme={theme}
        >
          {/* <Slide transition={['zoom']} bgColor='frontPage'>
            <Image src={DigioLogo} width={150} />
            <Heading size={1} caps lineHeight={1} textColor='frontPagePrimary'>
              IStio Demo
            </Heading>
            <Text margin='10px 0 0' textColor='frontPageSecondary' size={1} bold>
              Enabling resilient canary deployments and rollbacks with Istio
            </Text>
          </Slide> */}
          <Slide transition={['zoom']} bgColor='primary'>
            <Heading size={1} caps lineHeight={1} textColor='secondary'>
              Architecture
            </Heading>
            <Architecture />
          </Slide>
          <CodeSlide
            transition={['slide']}
            padding={0}
            lang='yaml'
            bgColor='codeBackground'
            textColor='primary'
            code={require('raw-loader!../assets/gw.yaml')}
            ranges={[
              { loc: [0, 20], title: 'Gateway' },
              { loc: [0, 1], title: 'New mesh API' },
              { loc: [1, 2], title: 'Custom Resource Definitions (CRDs)' },
              { loc: [6, 8], note: 'select which ingress gateway this policy should live on' },
              { loc: [9, 13], title: 'Listener', note: 'cluster resolvable hostname' },
              { loc: [13, 15], title: 'Host', note: 'will only allow traffic into mesh that have the matching Host reference' },
              { loc: [15, 20], title: 'mTLS', note: 'mutual TLS authentication on ingress' },
            ]}
          />
          <CodeSlide
            transition={['fade']}
            padding={0}
            lang='yaml'
            bgColor='codeBackground'
            textColor='primary'
            code={require('raw-loader!../assets/canary.vs.yaml')}
            ranges={[
              { loc: [0, 19], title: 'Default VirtualService' },
              { loc: [1, 2], title: 'Custom Resource Definition (CRD)' },
              { loc: [6, 9], title: 'Gateway Selector', note: 'gateways and sidecars we want this VirtualService policy to exist on' },
              { loc: [10, 11], title: 'Destination Host', note: 'the destination hostname we want this VirtualService to apply on' },
              { loc: [14, 15], title: 'Destination Host', note: 'must match the hostname specified in DestinationRule' },
              { loc: [15, 16], note: 'use the subset named "v1", which is defined in DestinationRule', title: 'Subsets' },
              { loc: [18, 19], note: 'send 100% of the traffic to v1 of the microservice', title: 'Subsets' }
            ]}
          />
          <CodeSlide
            transition={['slide']}
            padding={0}
            lang='yaml'
            bgColor='codeBackground'
            textColor='primary'
            code={require('raw-loader!../assets/canary.dr.yaml')}
            ranges={[
              { loc: [0, 17], title: 'DestinationRule' },
              { loc: [0, 1], title: 'New mesh API' },
              { loc: [1, 2], title: 'Custom Resource Definitions (CRDs)' },
              { loc: [6, 7], note: 'cluster resolvable hostname' },
              { loc: [7, 10], title: 'mTLS', note: 'mutual TLS between services' },
              { loc: [10, 17], title: 'Subsets' },
              { loc: [11, 14], note: 'match version: v1 of Pod label', title: 'Subsets' },
              { loc: [14, 17], note: 'match version: v2 of Pod label', title: 'Subsets' }
            ]}
          />
          <Slide transition={[ "spin", "slide" ]} bgColor="primary">
            <Heading size={ 1 } caps fit lineHeight={1} textColor="tertiary">kubectl</Heading>
            <Terminal title="1. castlemilk@digio: ~(zsh)" output={[
              <div style={{ fontSize: 16}}>kubectl get pods -n development --show-labels</div>,
              <div style={{ fontSize: 16}}>
                <div>NAME                                 READY     STATUS    RESTARTS   AGE  LABELS</div>
                <div style={{ display: 'flex'}}>microservice-a-v1-544b964d55-5ddnz   2/2       Running   0          1d   <div style={{ color: 'red'}}>version=0.0.1</div></div>
                <div style={{ display: 'flex'}}>microservice-a-v2-85c99d7f59-4j9n9   2/2       Running   0          2d   <div style={{ color: 'red'}}>version=0.0.2</div></div>
                <div style={{ display: 'flex'}}>microservice-a-v3-7449556665-kj6g8   2/2       Running   0          10m  <div style={{ color: 'red'}}>version=0.0.3</div></div>
              </div>]}
            />
          </Slide>
          {/* <Slide
            maxWidth={1600}
            transition={['fade']}
            align='flex-start flex-start'
            bgColor='secondary'
            textColor='primary'
          >
            <Image
              src={GenericLogo}
              width={150}
              style={{ animation: 'App-logo-spin infinite 20s linear' }}
            />
            <Heading size={1} caps lineHeight={1} textColor='white'>
              Canary Demo
            </Heading>
            <App />
          </Slide> */}
          <CodeSlide
            transition={['slide']}
            padding={0}
            lang='yaml'
            bgColor='codeBackground'
            textColor='primary'
            // code={vsCode}
            code={require('raw-loader!../assets/canary-90-10.vs.yaml')}
            ranges={[
              { loc: [0, 28], title: 'Canary VirtualService' },
              { loc: [1, 2], title: 'Custom Resource Definition (CRD)' },
              { loc: [6, 9], title: 'Gateway Selector', note: 'gateways and sidecars we want this VirtualService policy to exist on' },
              { loc: [10, 11], title: 'Destination Host', note: 'the destination hostname we want this VirtualService to apply on'},
              { loc: [13, 19], note: 'route 90% of traffic to "v1" of microservice', title: 'Primary Route' },
              { loc: [19, 25], note: 'route 10% of traffic to "v2" of microservice', title: 'Canary Route' },
              { loc: [25, 28], note: 'retry request 5 times before returning 500 error', title: 'Enable Retry' }
            ]}
          />
          <Slide
            align='flex-start flex-start'
            transition={['fade']}
            transitionDuration={1000}
            bgColor='secondary'
            textColor='primary'
          >
            <div
              style={{
                display: 'inline',
                textAlign: 'center',
                flexDirection: 'column',
                alignContent: 'center',
                width: '100%',
                // marginBottom: 20
              }}
            >
              <Heading size={1} fit caps lineHeight={1} textColor='white'>
                Jaeger (Distributed Tracing)
              </Heading>
            </div>
            <div style={{ marginTop: 20 }}>
              <iframe
                style={{ width: 1300, height: 900}}
                src={`http://jaeger.demo`}
                frameborder="0" allowfullscreen
              />
            </div>
          </Slide>
          <Slide
            align='flex-start flex-start'
            transition={['fade']}
            transitionDuration={1000}
            bgColor='secondary'
            textColor='primary'
          >
            <div
              style={{
                display: 'inline',
                textAlign: 'center',
                flexDirection: 'column',
                alignContent: 'center',
                height: 1000
              }}
            >
              <Heading size={1} fit caps lineHeight={1} textColor='white'>
                Grafana (Metrics)
              </Heading>
            </div>
            <div style={{ marginTop: 20 }}>
              <iframe
                width={1300}
                height={800}
                src={`http://grafana.demo`}
                frameborder="0" allowfullscreen
              />
            </div>
          </Slide>
          <Slide
            align='flex-start flex-start'
            transition={['fade']}
            bgColor='secondary'
            transitionDuration={1000}
            textColor='primary'
          >
            <div
              style={{
                display: 'inline',
                textAlign: 'center',
                flexDirection: 'column',
                alignContent: 'center',
                width: 1100
              }}
            >
              <Heading size={1} fit caps lineHeight={1} textColor='white'>
                Kiali (Mesh Observability)
              </Heading>
            </div>
            <div style={{ marginTop: 20 }}>
              <iframe
                width={1300}
                height={800}
                src={`http://kiali.demo/console/graph/namespaces/istio-system?layout=dagre&duration=60&edges=responseTime95thPercentile&graphType=versionedApp&injectServiceNodes=false`}
                frameborder="0" allowfullscreen
              />
            </div>
          </Slide>
          <Slide
            maxWidth={1600}
            transition={['fade']}
            align='flex-start flex-start'
            bgColor='secondary'
            textColor='primary'
          >
              <Image
                src={GenericLogo}
                width={150}
                width={150}
                style={{
                  animation: 'App-logo-spin infinite 20s linear'
                }}
              />
            <Heading size={1} caps lineHeight={1} textColor='white'>
              Canary Demo
            </Heading>
            <App />
          </Slide>
          <Slide transition={['fade']} bgColor='frontPage' textColor='secondary'>
              <Image
                  src={IstioLogo}
                  width={150}
                />
              <Heading size={1} caps lineHeight={1} textColor='secondary'>
              END
              </Heading>

            </Slide>
          <Slide transition={['fade']} bgColor='primary' textColor='secondary'>
              <Heading size={1} fit caps lineHeight={1} textColor='secondary'>
                Thanks for Listening!
              </Heading>
              <Text textColor="#03a9f4" textSize="2.5em" margin="50px 0px 0px 20px" bold>
              Questions?
              </Text>
              <div style={{ display: 'inline-flex' }} >
              <Image
                margin="0"
                style={{ display: 'inline-flex'}}
                src={Github}
                width={50}
                maxWidth={50}
                maxHeight={50}
                // style={{ animation: 'App-logo-spin infinite 20s linear' }}
              />
              <Text style={{ display: 'inline-flex', alignSelf: 'center' }} textSize="1em" margin="0px 0px 0px 20px" bold>
              github.com/mantel-digio/istiodemo
              </Text>
              </div>
              
          </Slide>
        </Deck>
      )
    )
  }
}
