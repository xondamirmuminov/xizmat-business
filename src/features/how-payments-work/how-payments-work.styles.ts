import { StyleSheet } from "react-native-unistyles";

export const howPaymentsWorkStyles = StyleSheet.create(({ space, colors }) => ({
  stepsBlock: {
    gap: space(1.75),
  },
  headerIcon: {
    color: colors.slate11,
  },
  feeCardIcon: {
    color: colors.primary,
  },
  statusCheckIcon: {
    color: colors.success,
  },
  feeClip: {
    borderRadius: 12,
    overflow: "hidden",
  },
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  statusList: {
    gap: space(2),
    marginTop: space(1.25),
  },
  sectionBody: {
    lineHeight: 22,
    marginTop: space(1.25),
  },
  noteParagraph: {
    lineHeight: 22,
    marginTop: space(1.25),
  },
  feeBadgeRow: {
    alignSelf: "center",
    marginBottom: space(1),
  },
  feeEyebrow: {
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  feeRibbon: {
    height: 4,
    width: "100%",
    backgroundColor: colors.primary,
  },
  surfaceLift: {
    borderColor: colors.slate4,
    borderWidth: StyleSheet.hairlineWidth,
  },
  sectionLead: {
    lineHeight: 22,
    marginTop: space(1.25),
    marginBottom: space(1.5),
  },
  notesWrap: {
    borderRadius: 12,
    padding: space(2),
    backgroundColor: colors.slate2,
  },
  surfaceCard: {
    borderRadius: 12,
    padding: space(2),
    backgroundColor: colors.slate2,
  },
  feeOuter: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.background,
  },
  feeNumberRow: {
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: space(0.25),
  },
  /** Extra bottom inset for tab/FAB + home indicator (replaces runtime scroll padding stack). */
  scrollContent: {
    flexGrow: 1,
    paddingTop: space(2),
    paddingBottom: space(4),
    paddingHorizontal: space(2),
  },
  feeInner: {
    gap: space(1),
    paddingTop: space(2),
    paddingBottom: space(2),
    paddingHorizontal: space(2),
    backgroundColor: colors.primarySubtle,
  },
  noteDivider: {
    lineHeight: 22,
    marginTop: space(2),
    paddingTop: space(2),
    borderTopColor: colors.slate4,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  errorBanner: {
    borderRadius: 12,
    paddingHorizontal: space(2),
    paddingVertical: space(1.5),
    borderColor: colors.errorPress,
    backgroundColor: colors.errorSubtle,
    borderWidth: StyleSheet.hairlineWidth,
  },
}));
