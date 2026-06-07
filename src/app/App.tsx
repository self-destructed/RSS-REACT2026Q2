import { useState, useRef, useEffect, type JSX } from "react";
import UncontrolledForm from "../components/uncontrolled-form/UncontrolledForm";
import ControlledForm from "../components/controlled-form/ControlledForm";
import SubmissionsList from "../components/submissions-list/SubmissionsList";
import { useAddSubmission } from "../store/userStore";
import type { FormValues } from "../lib/validationSchemas";
import { Modal } from "../components/ui/modal";

function App(): JSX.Element {
  const [modalKey, setModalKey] = useState<
    "controlled" | "uncontrolled" | null
  >(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const addSubmission = useAddSubmission();

  useEffect(() => {
    if (modalKey === null && lastTriggerRef.current) {
      lastTriggerRef.current.focus();
    }
  }, [modalKey]);

  const handleOpen = (
    e: React.MouseEvent<HTMLButtonElement>,
    key: "controlled" | "uncontrolled",
  ) => {
    lastTriggerRef.current = e.currentTarget;
    setModalKey(key);
  };

  const handleModalSubmit = (data: FormValues) => {
    void addSubmission(data);
    setModalKey(null);
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-8 text-center text-2xl font-bold text-gray-100">
        Forms Demo
      </h1>
      <div className="mb-4 flex justify-center gap-4">
        <button
          onClick={(e) => {
            handleOpen(e, "controlled");
          }}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Open Controlled Form
        </button>
        <button
          onClick={(e) => {
            handleOpen(e, "uncontrolled");
          }}
          className="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Open Uncontrolled Form
        </button>
      </div>
      <div className="mt-12">
        <SubmissionsList />
      </div>

      <Modal
        open={modalKey !== null}
        onClose={() => {
          setModalKey(null);
        }}
      >
        {modalKey === "controlled" && (
          <ControlledForm onSubmit={handleModalSubmit} />
        )}
        {modalKey === "uncontrolled" && (
          <UncontrolledForm onSubmit={handleModalSubmit} />
        )}
      </Modal>
    </div>
  );
}

export default App;
