import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const tableStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayDark, 
    padding: 16, 
  },
  hallButton: {
    padding: 16, 
    backgroundColor: colors.primary, 
    borderRadius: 10, 
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  hallText: {
    color: "white",
    fontSize: 18, 
    fontWeight: "600", 
    textAlign: "center",
  },
  noHallText: {
    color: "#4b5563", 
    fontSize: 18, 
    marginTop: 16, 
    alignSelf: "center",
  },
  backButton: {
    marginRight: 8, 
  },
  headerText: {
    fontSize: 20, 
    color: colors.primary, 
    fontWeight: "600", 
  },
  listContainer: {
    alignItems: "center",
  },
});
