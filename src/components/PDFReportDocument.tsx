import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { PDFStatistics } from "../utils/pdfStatistics";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 20,
    borderBottom: 2,
    borderBottomColor: "#1f2937",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280",
  },
  section: {
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 10,
    borderBottom: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 5,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 4,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  trendText: {
    fontSize: 12,
    marginTop: 4,
  },
  increasing: {
    color: "#dc2626",
  },
  decreasing: {
    color: "#16a34a",
  },
  stable: {
    color: "#6b7280",
  },
  chartSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 10,
    color: "#9ca3af",
  },
});

type PDFReportDocumentProps = {
  statistics: PDFStatistics;
};

export const PDFReportDocument = ({ statistics }: PDFReportDocumentProps) => {
  const getTrendText = () => {
    const { direction, percentage } = statistics.smokingTrend;
    if (direction === "stable") return "Stable - No significant change";

    const prefix = direction === "increasing" ? "UP" : "DOWN";
    return `${prefix} ${percentage}%`;
  };

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Smoking Report</Text>
          <Text style={styles.subtitle}>
            Period: {statistics.dateRange.start} - {statistics.dateRange.end}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Total Cigarettes</Text>
              <Text style={styles.statValue}>{statistics.totalSmokes}</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Days Tracked</Text>
              <Text style={styles.statValue}>{statistics.trackingDays}</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Average Per Day</Text>
              <Text style={styles.statValue}>
                {statistics.averagePerDay.toFixed(1)}
              </Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Smoke-Free Days</Text>
              <Text style={styles.statValue}>{statistics.smokeFreeDays}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Trends</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Last 7 Days Average</Text>
              <Text style={styles.statValue}>
                {statistics.last7DaysAverage.toFixed(1)}
              </Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Last 30 Days Average</Text>
              <Text style={styles.statValue}>
                {statistics.last30DaysAverage.toFixed(1)}
              </Text>
            </View>

            <View style={[styles.statCard, { width: "100%" }]}>
              <Text style={styles.statLabel}>Trend (vs Previous Week)</Text>
              <Text
                style={[
                  styles.trendText,
                  styles[statistics.smokingTrend.direction],
                ]}
              >
                {getTrendText()}
              </Text>
            </View>
          </View>
        </View>

        {(statistics.bestDay || statistics.worstDay) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Best & Worst Days</Text>
            <View style={styles.statsGrid}>
              {statistics.bestDay && (
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Best Day (Least Smokes)</Text>
                  <Text style={styles.statValue}>
                    {statistics.bestDay.count}
                  </Text>
                  <Text style={styles.statLabel}>
                    {statistics.bestDay.date}
                  </Text>
                </View>
              )}

              {statistics.worstDay && (
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Worst Day (Most Smokes)</Text>
                  <Text style={styles.statValue}>
                    {statistics.worstDay.count}
                  </Text>
                  <Text style={styles.statLabel}>
                    {statistics.worstDay.date}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        <Text style={styles.footer}>
          Generated by Smoker Tracker • {new Date().toLocaleDateString()}
        </Text>
      </Page>
    </Document>
  );
};
