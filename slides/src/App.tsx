import './App.css';
import {
    Code,
    enablePrismLineNumbers,
    Fragment,
    Note,
    NotesPlugin,
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

const plugins = [PrismHighlightPlugin, NotesPlugin];

const Main = () => (
    <Slide>
        <Code language="tsx">{{code: `<span class="hi"></span>`}}</Code>
        <Note>test 1</Note>
        <Fragment transition="highlight-blue">
            <Code language="tsx">{{code: `<span class="hi"></span>`}}</Code>
            <Note>test 2</Note>
        </Fragment>
    </Slide>
);

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
                                                                      width={'100em'} key={`server-${index}`} style={{margin: '2px'}}/>)}
            </div>
            <div style={{border: '2px solid white', borderRadius: '10px'}}>
                <img alt={'React Application'} src={`assets/react.png`} width={'100em'}/>
                <img alt={'Angular Application'} src={`assets/angular.png`} width={'100em'}/>
                <img alt={'Database'} src={`assets/database.png`} width={'100em'}/>
            </div>
        </div>
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
            </RevealJS>
        </div>
    );
}

export default App;