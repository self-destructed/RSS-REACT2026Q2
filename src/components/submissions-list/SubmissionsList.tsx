import type { JSX, ReactNode } from "react";
import { useSubmissions } from "../../store/userStore";

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}): JSX.Element {
  return (
    <div className="contents">
      <dt className="text-gray-500">{label}:</dt>
      <dd className="wrap-anywhere text-gray-100">{value}</dd>
    </div>
  );
}

interface InfoGridProps {
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
}

function InfoGrid(props: InfoGridProps): JSX.Element {
  const { name, age, email, gender, country } = props;
  return (
    <dl className="flex-1 min-w-0 grid gap-x-4 gap-y-0 grid-cols-[auto_1fr]">
      <InfoItem label="Name" value={name} />
      <InfoItem label="Gender" value={gender} />
      <InfoItem label="Age" value={age} />
      <InfoItem label="Country" value={country} />
      <InfoItem label="Email" value={email} />
    </dl>
  );
}

function SubmissionAvatar({
  image,
  name,
}: {
  image?: string;
  name: string;
}): JSX.Element {
  if (image) {
    return (
      <img
        src={image}
        alt=""
        className="h-24 w-24 shrink-0 rounded border border-gray-700 object-cover"
      />
    );
  }
  return (
    <div className="h-24 w-24 shrink-0 rounded border border-gray-700 bg-gray-800 flex items-center justify-center text-gray-500 text-2xl">
      {name[0].toUpperCase()}
    </div>
  );
}

export default function SubmissionsList(): JSX.Element {
  const submissions = useSubmissions();

  if (submissions.length === 0) {
    return (
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-6 text-center text-gray-400">
        No submissions yet
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-100">Submissions</h2>
      <ul className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {submissions.map((submission) => (
          <li key={submission.id}>
            <article className="h-full rounded-lg border border-gray-700 bg-gray-900 p-4">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                <SubmissionAvatar
                  image={submission.imageBase64}
                  name={submission.name}
                />
                <InfoGrid
                  name={submission.name}
                  age={submission.age}
                  email={submission.email}
                  gender={submission.gender}
                  country={submission.country}
                />
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
