'use client';

import { SimpleMRT } from '@pims-frontend/ui/components/common/cmm-material-react-table';
import { DataTableDemo } from '@pims-frontend/ui/components/common/cmm-shadcn-table';
//example data type
type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  job: {
    title: string;
    company: string;
    location?: {
      city: string;
      state: string;
    };
  };
  address: string;
  city: string;
  state: string;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    job: {
      title: 'Software Engineer',
      company: 'Google',
      location: {
        city: 'Mountain View',
        state: 'California',
      },
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    job: {
      title: 'Software Engineer',
      company: 'Facebook',
      location: {
        city: 'Menlo Park',
        state: 'California',
      },
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    job: {
      title: 'Software Engineer',
      company: 'Amazon',
      location: {
        city: 'Seattle',
        state: 'Washington',
      },
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    job: {
      title: 'Software Engineer',
      company: 'Microsoft',
      location: {
        city: 'Redmond',
        state: 'Washington',
      },
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    job: {
      title: 'Software Engineer',
      company: 'Apple',
      location: {
        city: 'Cupertino',
        state: 'California',
      },
    },
    address: '32188 Larkin Turnpike',
    city: 'Omaha',
    state: 'Nebraska',
  },
];

export default function SimpleGridPage() {
  return (
    <div className="p-4">
      <div className="prose dark:prose-invert max-w-none text-center">
        <h2>React Material Grid Simple Sample</h2>
      </div>
      <SimpleMRT data={data} />
      <div className="prose dark:prose-invert max-w-none text-center">
        <h2>Shadcn/ui Data Grid Simple Sample</h2>
      </div>
      <DataTableDemo />
    </div>
  );
}
