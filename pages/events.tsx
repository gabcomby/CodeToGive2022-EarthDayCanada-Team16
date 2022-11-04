import Head from 'next/head';
import TopBar from '../components/topbar';

export default function Events() {
    return (
        <div>
    Hello World!
    <style global jsx>{`
      html,
      body,
      body > div:first-child,
      div#__next,
      div#__next > div {
        height: 100%;
      }
    `}</style>
  </div>
    );
}