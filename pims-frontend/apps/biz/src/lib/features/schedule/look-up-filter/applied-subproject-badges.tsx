import { useAppDispatch, useAppSelector } from '@pims-frontend/biz/lib/hooks';
import { scheduleActions, scheduleSelectors } from '../scheduleSlice';
import { BadgeForFilter } from '@pims-frontend/ui/components/ui/badge';

export type AppliedSubprojectBadgesProps = {
  allText?: string;
};

export function AppliedSubprojectBadges({
  allText = '전체',
}: AppliedSubprojectBadgesProps) {
  const { strippedSubprojects, isAllSelected: isAllSubprojectsSelected } =
    useAppSelector(scheduleSelectors.selectAppliedFilterSubProjects);
  const dispatch = useAppDispatch();

  return (
    <>
      {isAllSubprojectsSelected && <BadgeForFilter>{allText}</BadgeForFilter>}
      {strippedSubprojects.length > 0 &&
        !isAllSubprojectsSelected &&
        strippedSubprojects.map((subproject) => (
          <BadgeForFilter
            key={subproject.value}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              dispatch(
                scheduleActions.onUncheckedSubprojectFromApplied({
                  value: subproject.value,
                }),
              );
            }}
          >
            {`${subproject.label}   X`}
          </BadgeForFilter>
        ))}
    </>
  );
}
