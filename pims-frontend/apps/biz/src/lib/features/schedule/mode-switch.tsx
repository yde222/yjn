import { ParameterizedIcon } from '@pims-frontend/ui/components/ui/parameterized-icon';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { scheduleActions, scheduleSelectors } from './scheduleSlice';
import { Button } from '@pims-frontend/ui/components/ui/button';

export function ModeSwitch() {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(scheduleSelectors.selectLookUp);

  if (mode === 'look-up') {
    return (
      <Button
        onClick={() => {
          dispatch(scheduleActions.changeMode({ mode: 'plan' }));
        }}
      >
        <ParameterizedIcon name="FilePenLine" />
        계획하기
      </Button>
    );
  }

  if (mode === 'plan') {
    return (
      <Button
        onClick={() => {
          // TODO: save logic
          dispatch(scheduleActions.changeMode({ mode: 'look-up' }));
        }}
      >
        <ParameterizedIcon name="Save" />
        저장하기
      </Button>
    );
  }

  // view-only mode
  return <></>;

  // return (
  //   <div className="bg-primary-normal p-1 flex rounded-md">
  //     <button
  //       className={`flex items-center space-x-2 px-4 py-1.5 rounded-md transition-colors ${
  //         mode === 'look-up'
  //           ? 'bg-white text-primary-normal'
  //           : 'text-text-disabled'
  //       }`}
  //       onClick={() => {
  //         dispatch(scheduleActions.changeMode({ mode: 'look-up' }));
  //       }}
  //     >
  //       <ParameterizedIcon name="CalendarFold" className="w-5 h-5" />
  //       <span className="text-sm">조회</span>
  //     </button>
  //     <button
  //       className={`flex items-center space-x-2 px-4 py-1.5 rounded-md transition-colors ${
  //         mode === 'plan'
  //           ? 'bg-white text-primary-normal'
  //           : 'text-text-disabled'
  //       }`}
  //       onClick={() => {
  //         dispatch(scheduleActions.changeMode({ mode: 'plan' }));
  //       }}
  //     >
  //       <ParameterizedIcon name="CalendarCog" className="w-5 h-5" />
  //       <span className="text-sm">계획</span>
  //     </button>
  //   </div>
  // );
}
