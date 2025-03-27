import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-indigo-700">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-30"
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Team working together"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About Shopflow
          </h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
            Connecting buyers and sellers in a seamless, community-driven marketplace
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative lg:row-start-1 lg:col-start-2">
              <img
                className="relative mx-auto rounded-lg shadow-xl"
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Founders"
                width={600}
              />
              <div className="absolute -left-8 -top-8 w-32 h-32 bg-indigo-100 rounded-full opacity-70"></div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-yellow-100 rounded-full opacity-70"></div>
            </div>
            <div className="mt-10 lg:mt-0">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Our Story
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Shopflow was founded in 2025 with a simple mission: to create a marketplace that puts people first. 
                Frustrated by the impersonal nature of large e-commerce platforms, our founders set out to build 
                a space where local communities could thrive through commerce.
              </p>
              <p className="mt-4 text-lg text-gray-500">
                What started as a small project among friends has grown into a vibrant marketplace serving thousands 
                of users across the country, all while maintaining our commitment to authentic, human-centered 
                transactions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              These principles guide everything we do at Shopflow
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Community First',
                description: 'We believe commerce should strengthen local communities, not replace them.',
                icon: (
                  <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                name: 'Transparency',
                description: 'Clear pricing, honest descriptions, and open communication in every transaction.',
                icon: (
                  <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                name: 'Sustainability',
                description: 'Promoting reuse and reducing waste through second-hand commerce.',
                icon: (
                  <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )
              },
              {
                name: 'Empowerment',
                description: 'Giving individuals the tools to become micro-entrepreneurs.',
                icon: (
                  <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                name: 'Security',
                description: 'Protecting our users with robust safety measures and fraud prevention.',
                icon: (
                  <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )
              },
              {
                name: 'Innovation',
                description: 'Continuously improving to create the best marketplace experience.',
                icon: (
                  <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              }
            ].map((value, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full shadow">
                  <div className="-mt-6">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                      {value.icon}
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">
                      {value.name}
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      {/* <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              The passionate people behind Y-STORE
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Alex Johnson',
                role: 'Founder & CEO',
                image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                bio: 'Serial entrepreneur with a passion for community-driven commerce.'
              },
              {
                name: 'Maria Garcia',
                role: 'Head of Product',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                bio: 'User experience expert focused on creating intuitive marketplace interactions.'
              },
              {
                name: 'James Wilson',
                role: 'CTO',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                bio: 'Technology visionary building secure, scalable marketplace infrastructure.'
              },
              {
                name: 'Sarah Chen',
                role: 'Community Manager',
                image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                bio: 'Connects and supports our growing community of buyers and sellers.'
              },
              {
                name: 'David Kim',
                role: 'Marketing Director',
                image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                bio: 'Spreads the word about Y-STORE and our mission.'
              },
              {
                name: 'You?',
                role: 'Future Team Member',
                image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                bio: 'We\'re always looking for talented people to join our mission.'
              }
            ].map((person, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div className="flex items-center justify-center h-40 w-40 rounded-full overflow-hidden mx-auto border-4 border-white shadow-lg">
                      <img
                        className="h-full w-full object-cover"
                        src={person.image}
                        alt={person.name}
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">
                      {person.name}
                    </h3>
                    <p className="mt-1 text-base text-indigo-600 text-center">
                      {person.role}
                    </p>
                    <p className="mt-2 text-base text-gray-500 text-center">
                      {person.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to join our community?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Whether you're looking to buy unique items or start selling, we've got you covered.
          </p>
          <Link
            to="/"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;