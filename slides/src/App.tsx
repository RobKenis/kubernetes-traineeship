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
        <Code language="tsx">{{ code: `<span class="hi"></span>` }}</Code>
        <Note>test 1</Note>
        <Fragment transition="highlight-blue">
            <Code language="tsx">{{ code: `<span class="hi"></span>` }}</Code>
            <Note>test 2</Note>
        </Fragment>
    </Slide>
);

function App() {
    return (
        <div className="App">
            <RevealJS plugins={plugins} history>
                <Slide>
                    <h3>Kubernetes</h3>
                    <a href="https://github.com/RobKenis/kubernetes-traineeship"><i className="fa fa-bitbucket"></i></a> - <a
                    href="http://slides.traineeship-2022.axxes.cloud">http://slides.traineeship-2022.axxes.cloud</a>
                </Slide>
            </RevealJS>
        </div>
    );
}

export default App;