import { NextPage } from 'next';
import { ExternalLink } from '../components/ExternalLink';

import { Shell } from '../components/Shell';

const CV: NextPage = () => {
  return (
    <Shell>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <h1 className="font-bold text-3xl md:text-5xl mb-6 text-black dark:text-white">
          CV
        </h1>
        <h2 className="font-bold text-2xl md:text-4xl mb-6 text-black dark:text-white">
          Education
        </h2>
        <h3 className="font-bold text-lg md:text-2xl mb-1 text-black dark:text-white">
          Master of Information Technology
        </h3>
        <p className="text-gray-600 dark:text-gray-200 mb-10">
          High Distinction, University of New South Wales 2015
        </p>
        <h2 className="font-bold text-2xl md:text-4xl mb-6 text-black dark:text-white">
          Experience
        </h2>
        <h3 className="font-bold text-lg md:text-2xl mb-1 text-black dark:text-white">
          Software Developer at{' '}
          <ExternalLink
            className="bg-gradient-to-r from-[#FDE68A] via-[#FCA5A5] to-[#FA709A] bg-clip-text text-transparent"
            href="https://rocketmakers.com"
          >
            Rocketmakers
          </ExternalLink>
        </h3>
        <h4 className="font-bold text-base md:text-lg mb-1 text-black dark:text-white">
          Jan 2021 - Present
        </h4>
        <p className="text-gray-600 dark:text-gray-200 mb-10">
          Responsible for:
          <ul className="list-disc list-inside">
            <li>
              Building augmented reality demos using Unity 2020 with C# to
              showcase the capabilities of the in-house developed product Beam.
            </li>
            <li>
              Development of features for the Beam plugin for Unity using C#, as
              well as the Beam plugin for Unreal Engine 4 using C++ and
              blueprints.
            </li>
            <li>
              Product ownership of the Beam plugin for Unreal Engine 4 using
              Jira.
            </li>
            <li>
              Development and maintenance of features for the Pure Planet mobile
              app and web app.
            </li>
            <li>
              Mentoring junior developers on the Pure Planet project. Running
              training workshops on technologies used at the company such as
              Unity and React.
            </li>
          </ul>
        </p>
        <h3 className="font-bold text-lg md:text-2xl mb-1 text-black dark:text-white">
          Software Developer at{' '}
          <ExternalLink
            className="bg-gradient-to-r from-[#FDE68A] via-[#FCA5A5] to-[#FA709A] bg-clip-text text-transparent"
            href="https://www.libraryofthings.co.uk"
          >
            Library of Things
          </ExternalLink>
        </h3>
        <h4 className="font-bold text-base md:text-lg mb-1 text-black dark:text-white">
          Sep 2019 - Jan 2021
        </h4>
        <p className="text-gray-600 dark:text-gray-200 mb-10">
          Responsible for:
          <ul className="list-disc list-inside">
            <li>
              Launching and maintaining a new suite of web-apps to facilitate
              borrowing a variety of items in Crystal Palace Library, including
              a public-facing web app, an internal admin tool, and a
              touch-screen kiosk app to interface with a locker system.
            </li>
            <li>
              Development of front end features through design and development,
              using tools such as Figma for design and TypeScript, Sass, and
              React for development.
            </li>
            <li>
              Development of back end features to support the user interface
              across several webapps, using TypeScript and Node.js along with a
              Prisma/PostgreSQL database with a GraphQL API layer on top.
            </li>
            <li>
              Making architectural software decisions around application
              structure and tools/frameworks used, including approaches to
              shared code and styling across three web-apps.
            </li>
            <li>
              Promoting best practices for web development in my team, including
              review of type systems, and our approach to linting as well as
              testing.
            </li>
          </ul>
        </p>
        <h3 className="font-bold text-lg md:text-2xl mb-1 text-black dark:text-white">
          Software Developer at{' '}
          <ExternalLink
            className="bg-gradient-to-r from-[#FDE68A] via-[#FCA5A5] to-[#FA709A] bg-clip-text text-transparent"
            href="https://medicmobile.org/"
          >
            Medic Mobile
          </ExternalLink>
        </h3>
        <h4 className="font-bold text-base md:text-lg mb-1 text-black dark:text-white mb-8">
          Jan 2018 - Sep 2019
        </h4>
        <h3 className="font-bold text-lg md:text-2xl mb-1 text-black dark:text-white">
          Front End Developer at{' '}
          <ExternalLink
            className="bg-gradient-to-r from-[#FDE68A] via-[#FCA5A5] to-[#FA709A] bg-clip-text text-transparent"
            href="https://www.antidote.me/"
          >
            Antidote
          </ExternalLink>
        </h3>
        <h4 className="font-bold text-base md:text-lg mb-1 text-black dark:text-white mb-8">
          Jul 2016 - Dec 2017
        </h4>
        <h3 className="font-bold text-lg md:text-2xl mb-1 text-black dark:text-white">
          Front End Developer at Student.com
        </h3>
        <h4 className="font-bold text-base md:text-lg mb-1 text-black dark:text-white mb-8">
          Mar 2016 - Jun 2016
        </h4>
        <h3 className="font-bold text-lg md:text-2xl mb-1 text-black dark:text-white">
          Junior Front End Developer at Oomph
        </h3>
        <h4 className="font-bold text-base md:text-lg mb-1 text-black dark:text-white mb-8">
          Feb 2015 - Dec 2015
        </h4>
        <h3 className="font-bold text-lg md:text-2xl mb-1 text-black dark:text-white">
          Web Developer/Co-Director at Werkhaus Design Studio
        </h3>
        <h4 className="font-bold text-base md:text-lg mb-1 text-black dark:text-white">
          Nov 2012 - Feb 2015
        </h4>
      </div>
    </Shell>
  );
};

export default CV;
