import './App.css';
import {
    Code,
    enablePrismLineNumbers,
    Fragment,
    PrismHighlightPlugin,
    RevealJS,
    Slide,
} from '@gregcello/revealjs-react';
import 'reveal.js/dist/theme/night.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import 'prismjs/plugins/line-highlight/prism-line-highlight.css';

enablePrismLineNumbers();

const plugins = [PrismHighlightPlugin];

const TitleSlide = () => (
    <Slide>
        <h3>Kubernetes</h3>
        <a href="https://github.com/RobKenis/kubernetes-traineeship"><i className="fa fa-bitbucket"></i></a> - <a
        href="http://slides.traineeship-2022.axxes.cloud">http://slides.traineeship-2022.axxes.cloud</a>
    </Slide>
)

const TableOfContents = () => (
    <Slide>
        <h2>Planning</h2>
        <ol>
            <li>What is Kubernetes?</li>
            <li>Deploying an Application</li>
            <li>Service Discovery and Ingress</li>
            <li>Monitoring and Debugging</li>
        </ol>
    </Slide>
)

interface ServerProps {
    apps: string[]
}

const Server = ({apps}: ServerProps) => (
    <div style={{display: "flex", flexDirection: "column"}}>
        <Fragment>
            <img alt={'Server'} src={'assets/server.png'} width={'200em'}/>
        </Fragment>
        <Fragment>
            {apps.map((app, index) => (
                <img alt={'React Application'} src={`assets/${app}.png`} width={'100em'} key={index}/>))}
        </Fragment>
    </div>
)

const WhatIsKubernetes = () => (
    <Slide>
        <h2>What is Kubernetes?</h2>
        <div style={{display: "flex", flexDirection: "row"}}>
            <Server apps={['react']}/>
            <Server apps={['react']}/>
            <Server apps={['database']}/>
            <Server apps={['react', 'database']}/>
            <Server apps={['angular', 'database']}/>
            <Server apps={['angular']}/>
            <Server apps={['react']}/>
            <Server apps={['react']}/>
            <Server apps={['react']}/>
            <Server apps={['angular']}/>
        </div>
    </Slide>
)

const ThisIsKubernetes = () => (
    <Slide>
        <div style={{display: "flex", flexDirection: 'row'}}>
            <div style={{border: '2px solid white', borderRadius: '10px', margin: '10px'}}>
                {Array.apply(0, Array(10)).map((value, index) => <img alt={'Server'} src={'assets/server.png'}
                                                                      width={'100em'} key={`server-${index}`}
                                                                      style={{margin: '2px'}}/>)}
            </div>
            <div style={{border: '2px solid white', borderRadius: '10px'}}>
                <img alt={'React Application'} src={`assets/react.png`} width={'100em'}/>
                <img alt={'Angular Application'} src={`assets/angular.png`} width={'100em'}/>
                <img alt={'Database'} src={`assets/database.png`} width={'100em'}/>
            </div>
        </div>
    </Slide>
)

const GettingAccess = () => (
    <Slide>
        <h2>Getting Access</h2>
        <a href={'https://kubernetes.io/docs/tasks/tools/'}>https://kubernetes.io/docs/tasks/tools/</a>
        <Code language='shell'>
            {{
                code: `$ kubectl version --client
$ aws eks update-kubeconfig --region eu-west-1 --name kubernetes-traineeship
$ kubectl get pods --all-namespaces`
            }}
        </Code>
        <small>For a more visual tool, use <a href={'https://k8slens.dev/'}>Lens</a></small>
    </Slide>
)

const DeployingAnApplication = () => (
    <Slide>
        <h3>Deploying an Application</h3>
        <Code language='javascript'>
            {{
                code: `// Create a namespace
$ 'kubectl create namespace rob'
// Deploy your application in the namespace
$ 'kubectl create deployment test --namespace rob --image nginx'`
            }}
        </Code>
    </Slide>
)

const ViewingYourApplication = () => (
    <Slide>
        <h3>Viewing your application</h3>
        <Code language='javascript'>
            {{
                code: `// Get all pods in your namespace
$ 'kubectl get pods -n rob'
// Get the logs from your pod
$ 'kubectl logs test-8499f4f74-f47jv -n rob -f'
// Port forward to your local machine
$ 'kubectl port-forward test-8499f4f74-f47jv 8080:80 -n rob'`
            }}
        </Code>
    </Slide>
)

const ScalingYourApplication = () => (
    <Slide>
        <h3>Scaling your application</h3>
        <Code language='javascript'>
            {{
                code: `// Get all cluster nodes
$ 'kubectl get nodes -o wide'
// Scale your deployment
$ 'kubectl scale deployment test -n rob --replicas 10'
// Wait until all new pods are running
$ 'kubectl get pods --all-namespaces -w'`
            }}
        </Code>
    </Slide>
)

const DeployYourOwnApplication = () => (
    <Slide>
        <h3>Deploy your own application</h3>
        <Code language='javascript'>
            {{
                code: `$ kubectl edit deployment test -n rob`
            }}
        </Code>
        <Code language='yaml'>
            {{
                code: `spec:
  replicas: 10
  selector:
    matchLabels:
      app: test
  template:
    spec:
      containers:
      - image: 084518896710.dkr.ecr.eu-west-1.amazonaws.com/kubernetes-traineeship-slides:amd64`
            }}
        </Code>
    </Slide>
)

const VersioningYourConfiguration = () => (
    <Slide>
        <h3>Versioning your configuration</h3>
        <Code language='javascript'>
            {{
                code: `// Get the current manifest as YAML
$ 'kubectl get deployment test -n rob -o yaml > deployment.yaml'
// Apply the edited YAML file
$ 'kubectl apply -f deployment.yaml'`
            }}
        </Code>
    </Slide>
)

const ServiceDiscovery = () => (
    <Slide>
        <h2>Service discovery</h2>
        <Fragment>
            <p>Translate <span style={{color: 'orange'}}>172.31.19.38:8080</span> to <span style={{color: 'limegreen'}}>http://backend-service/</span></p>
        </Fragment>
    </Slide>
)

const CreatingAService = () => (
    <Slide>
        <h3>Creating a Service</h3>
        <Code language='yaml'>
            {{
                code: `apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app.kubernetes.io/name: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376`
            }}
        </Code>
    </Slide>
)

function App() {
    return (
        <div className="App">
            <RevealJS plugins={plugins} history>
                <TitleSlide/>
                <TableOfContents/>
                <WhatIsKubernetes/>
                <ThisIsKubernetes/>
                <GettingAccess/>
                <DeployingAnApplication/>
                <ViewingYourApplication/>
                <ScalingYourApplication/>
                <DeployYourOwnApplication/>
                <VersioningYourConfiguration/>
                <ServiceDiscovery/>
                <CreatingAService/>
            </RevealJS>
        </div>
    );
}

export default App;