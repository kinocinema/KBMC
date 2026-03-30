import React from 'react';

interface PageProps {
  title: string;
  content: string;
}

const Page: React.FC<PageProps> = ({ title, content }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-tight">{title}</h1>
      <div className="prose prose-slate max-w-none">
        <p className="text-lg text-gray-600 leading-relaxed">
          {content}
        </p>
        
        {/* Placeholder for more content to make it look like a real page */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Information</h3>
            <p className="text-sm text-gray-600">
              This section contains detailed information regarding {title.toLowerCase()}. We continuously update our resources to provide you with the most accurate and helpful information.
            </p>
          </div>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Need Assistance?</h3>
            <p className="text-sm text-gray-600 mb-4">
              If you have any questions or need further clarification about {title.toLowerCase()}, please don't hesitate to reach out to our support team.
            </p>
            <button className="text-teal-700 font-bold text-sm hover:underline">Contact Support &rarr;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
