import { StyleSheet } from "react-native-unistyles";

export const contactUsStyles = StyleSheet.create(({ space, colors }) => ({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollColumn: {
    flex: 1,
  },
  footerSpacer: {
    flexGrow: 1,
    minHeight: space(3),
  },
  brandFooter: {
    alignItems: "center",
    alignSelf: "stretch",
    gap: space(1),
    /** Extra room above home indicator / FAB overlap */
    paddingBottom: space(2),
    paddingTop: space(2),
  },
  /** Keeps the logo within screen width so wide marks are not clipped */
  brandLogoWrap: {
    width: "100%",
    alignItems: "center",
  },
  brandLogo: {
    width: "76%",
    maxWidth: 156,
    height: 40,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: space(2),
    paddingBottom: space(6),
    paddingHorizontal: space(2),
  },
}));
