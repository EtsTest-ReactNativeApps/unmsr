import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { selectOrg } from "./../redux/orgs/orgsSelectors";
import { selectIsInMembershipList } from "./../redux/user/userSelectors";
import EventsList from "../custom-components/event-components/EventsList";
import CategoryLabels from "./../custom-components/category-components/CategoryLabels";
import {
  JoinOrgFAB,
  LeaveOrgFAB,
} from "./../custom-components/org-components/orgFAB";

// FIXME: edited styling for mini-table content
// TODO: add events list data for organization without nesting !!!

const OrgDetails = (props) => {
  // select an organization
  const org = useSelector(selectOrg(props.route.params.orgID));

  // check if current user is a member
  const orgInUserMembershipList = useSelector(selectIsInMembershipList(org.UID));

  console.log("membership: " + orgInUserMembershipList);

  // console.log("org " + JSON.stringify(org));

  // count of members
  const memberCount = Object.keys(org.members).length;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} nestedScrollEnabled={true}>
        <View style={styles.headerContainer}>
          <Text style={styles.nameHeader}>{org.name}</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.description}>
            {org.about.summary ? org.about.summary : org.about.longDescription}
          </Text>
          <Text style={styles.memberCountContainer}>
            <Text style={styles.memberCount}>{memberCount}</Text>{" "}
            {memberCount > 1 ? `members` : `member`}
          </Text>
          <CategoryLabels data={org.categoryList} />
          <Text style={styles.sectionHeader}>Meeting Info</Text>
          <View style={styles.infoTable}>
            <View style={styles.infoLabels}>
              <Text style={styles.label}>Hours: </Text>
              <Text style={styles.label}>Days: </Text>
              <Text style={styles.label}>Venue: </Text>
            </View>
            <View style={styles.infoData}>
              <Text>{org.meetingInfo.meetingHours}</Text>
              <Text>{org.meetingInfo.meetingDays}</Text>
              <Text>{org.meetingInfo.meetingVenue}</Text>
            </View>
          </View>
          {/* TODO: render events from list of event UIDs */}
          <Text style={styles.sectionHeader}>Membership Information</Text>
          <View style={styles.infoTable}>
            <View style={styles.infoLabels}>
              <Text style={styles.label}>Criteria: </Text>
            </View>
            <View style={styles.infoData}>
              <Text>{org.membershipCriteria.required ? org.membershipCriteria.details : "none"}</Text>
            </View>
          </View>
          <Text style={styles.sectionHeader}>Contact</Text>
          <View style={styles.infoTable}>
            <View style={styles.infoLabels}>
              <Text style={styles.label}>Email: </Text>
              <Text style={styles.label}>Phone #: </Text>
              <Text style={styles.label}>Location: </Text>
              <Text style={styles.label}>Website: </Text>
            </View>
            <View style={styles.infoData}>
              <Text>{org.contactInfo.emailAddress}</Text>
              <Text>{org.contactInfo.phoneNumber}</Text>
              <Text>{org.contactInfo.location}</Text>
              <Text>{org.contactInfo.website}</Text>
            </View>
          </View>
          {/* TODO: <Text style={styles.sectionHeader}>Leadership</Text> */}
        </View>
      </ScrollView>
      {orgInUserMembershipList ? (
        <LeaveOrgFAB orgUID={org.UID} />
      ) : (
        <JoinOrgFAB orgUID={org.UID} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 5,
    height: 200,
    backgroundColor: "#D14081",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  nameHeader: {
    alignSelf: "flex-end",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    padding: 10,
  },
  bodyContainer: {
    padding: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  memberCountContainer: {
    fontSize: 14,
    marginBottom: 10,
  },
  memberCount: {
    fontWeight: "bold",
  },
  infoTable: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoLabels: {
    flex: 1,
  },
  label: {
    fontWeight: "bold",
  },
  infoData: {
    flex: 4,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 5,
    marginTop: 10,
  },
});

export default OrgDetails;
